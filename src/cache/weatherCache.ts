// const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours (For testing purposes only)

export const weatherCache = {
    get<T>(key: string): T | null {
        const cache = localStorage.getItem(key); 
        
        if (!cache) {
            return null;
        }

        const parsedCache = JSON.parse(cache);

        const expired = Date.now() - parsedCache.timestamp > CACHE_DURATION;

        if (expired) {
            localStorage.removeItem(key);
            return null;   
        }

        return parsedCache.data;
    },

    set<T>(key: string, data: T) {
        localStorage.setItem(
            key,
            JSON.stringify({
                data,
                timestamp: Date.now()
            })
        )
    }
}