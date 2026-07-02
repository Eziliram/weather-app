// Weather data changes relatively slowly,
// so we can cache it in localStorage for a short period of time
// to reduce API calls and improve performance.
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour

export const weatherCache = {
    get<T>(key: string): { data: T; lastUpdated: Date } | null {
        const cache = localStorage.getItem(key); 
        
        if (!cache) {
            return null;
        }

        const parsedCache = JSON.parse(cache) as { data: T; cachedAt: number };

        // To keep the caching implementation simple,
        // expired cache entries are removed when they are accessed.
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