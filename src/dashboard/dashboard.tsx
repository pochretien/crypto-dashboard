import {getCoinsMarkets} from '../api/api'
import { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import {CoinMarkedSparkline} from "../api/coingeckoInterface";
import {StyledPage} from "../style/components/styledPage";
import {CryptoCard} from "./card/cryptoCard";
import {CurrencyCode} from "../utils/currency";
import {StyledLoading} from "../style/components/styledLoading";
import {StyledContent} from "../style/components/styledContent";

export const Dashboard = () => {
  const [page, setPage] = useState<number>(1);
  const [listData, setListData] = useState<CoinMarkedSparkline[]>([]);
  const [currency] = useState<CurrencyCode>(CurrencyCode.USD);
  let isFetching = false;

  useEffect(() => {
    if (!isFetching) {
      isFetching = true;
      getCoinsMarkets({per_page: 20, page, vs_currency: currency, sparkline: true}).then((list) => {
        setListData(listData.concat(list))
        isFetching = false;
      })
    }
  }, [page])

  useEffect(() => {
    setListData([]);
    setPage(1);
  }, [currency]);

  const fetchMoreData = () => {
    setPage(page + 1);
  }

  if (!listData.length && isFetching) {
    return <StyledLoading>Loading ...</StyledLoading>
  }
  if (!listData.length) {
    return <StyledLoading>No data!</StyledLoading>
  }
  return (
    <StyledPage>
      <StyledContent>
        <InfiniteScroll
            dataLength={listData.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<StyledLoading>Loading...</StyledLoading>}
        >
          {listData.map((data, index) => {
            return <CryptoCard key={`crypto-list-${index}`} coinMarkedSparkline={data} currency={currency} />
          })}
        </InfiniteScroll>
      </StyledContent>
    </StyledPage>
  )
}
