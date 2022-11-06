export interface CoinsMarketsParam {
    vs_currency: string;
    ids?: string;
    category?: "decentralized_finance_defi" | "stablecoins";
    order?:
        | "market_cap_desc"
        | "gecko_desc"
        | "gecko_asc"
        | "market_cap_asc"
        | "volume_asc"
        | "volume_desc"
        | "id_asc"
        | "id_desc";
    per_page?: number;
    page?: number;
    sparkline?: boolean;
    price_change_percentage?: string;
}
