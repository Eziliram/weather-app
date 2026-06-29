const http = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json();
}

export default http; 