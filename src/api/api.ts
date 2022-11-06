import {API_ROUTES} from "./apiRoutes";
import {CoinsMarketsParam} from "./apiInterface";

const basePath = "https://api.coingecko.com/api/v3/";

const apiFetch = async (url: string) => {
    const response: Response = await fetch(basePath + url);
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        return response.json();
    } else {
        /// Throw error;
    }

}

export const getCoinsMarkets = (param: CoinsMarketsParam) => {
    const paramString = new URLSearchParams(param).toString();
    return apiFetch(API_ROUTES.COIN_MARKET + (paramString ? `?${paramString}`: ''));
}
