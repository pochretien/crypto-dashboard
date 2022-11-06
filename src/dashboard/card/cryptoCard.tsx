import React from 'react';
import Collapsible from 'react-collapsible';
import { Sparkline } from '../../graph/sparkline/sparkline';
import { Point } from '../../graph/sparkline/sparklineDrawer';
import { CoinMarkedSparkline } from "../../api/coingeckoInterface";
import {CryptoCardInfo} from "./cryptoCardInfo";
import {StyledCard} from "../../style/components/styledCard";
import {CurrencyCode} from "../../utils/currency";
import {StyledCryptoCollapsibleBox} from "../../style/components/styledCryptoCollapsibleBox";

export interface CryptoCardProps {
    coinMarkedSparkline: CoinMarkedSparkline;
    currency: CurrencyCode;
}

export const CryptoCard = ({ coinMarkedSparkline, currency }: CryptoCardProps) => {
  const sparklineData = coinMarkedSparkline.sparkline_in_7d?.price.map<Point>((price, index) => ({
    x: index,
    y: price,
  }))
  return (
      <StyledCard>
        <Collapsible trigger={<CryptoCardInfo data={coinMarkedSparkline} currency={currency} />}>
            <StyledCryptoCollapsibleBox>
                <Sparkline data={sparklineData} info={coinMarkedSparkline} currency={currency} width={940} height={280} scaleY={1.05} />
            </StyledCryptoCollapsibleBox>
        </Collapsible>
      </StyledCard>
  )
}
