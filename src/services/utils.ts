
export async function fetchAndParse<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    //for easier type handling when fetching
    const response = await fetch(input, init);
    const data = await response.json();
    return data as T;
}