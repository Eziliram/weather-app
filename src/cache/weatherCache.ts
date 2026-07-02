const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const weatherCache = {
    get<T>(key: string): { data: T; lastUpdated: Date } | null {
        const cache = localStorage.getItem(key); 
        
        if (!cache) {
            return null;
        }

        const parsedCache = JSON.parse(cache) as { data: T; cachedAt: number };

        const expired = Date.now() - parsedCache.cachedAt > CACHE_DURATION;

        if (expired) {
            localStorage.removeItem(key);
            return null;   
        }

        return {
            data: parsedCache.data,
            lastUpdated: new Date(parsedCache.cachedAt)
        };
    },

    set<T>(key: string, data: T) {
        localStorage.setItem(
            key,
            JSON.stringify({
                data,
                cachedAt: Date.now()
            })
        )
    }
}