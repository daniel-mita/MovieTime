import {  api_KEY, BASE_URL, headers } from "./config";
import { fetchAndParse } from "./utils";


export function getTopMovies(page: number): Promise<any> {
    const url = new URL('/movie/top_rated',BASE_URL)
    url.searchParams.append("api_key", api_KEY);
    url.searchParams.append("page", page.toString());
    return fetchAndParse<any>(url.toString(), { method: "GET", headers, });
}

export function getMoviesBySearch(query: string): Promise<any>{
    const url = new URL('/search/movie',BASE_URL)
    url.searchParams.append("api_key", api_KEY);
    url.searchParams.append("query", query);
    return fetchAndParse<any>(url.toString(), {method: "GET", headers});
}

export function getSingleMovie(id: string): Promise<any>{
    const url = new URL(`/movie/${id}`,BASE_URL)
    url.searchParams.append("api_key", api_KEY);
    return fetchAndParse<any>(url.toString(), {method: "GET", headers});
}

export function getPopularMovies(): Promise<any> {
    const url = new URL('/movie/popular',BASE_URL)
    url.searchParams.append("api_key", api_KEY);
    return fetchAndParse<any>(url.toString(), { method: "GET", headers, });
}

