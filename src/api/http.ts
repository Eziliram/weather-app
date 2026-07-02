const http = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    
    // [429] too_many_requests: User has reached their subscription's monthly request allowance.
    if (response.status === 429) {
        throw new Error("Monthly request limit reached. Please try again later.");
    }

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json();
}

export default http; 