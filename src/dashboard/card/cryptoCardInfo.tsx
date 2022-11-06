import {CoinMarkedSparkline} from "../../api/coingeckoInterface";
import {StyledImage} from "../../style/components/styledImage";
import {StyledTextBox} from "../../style/components/styledTextBox";
import {StyledText} from "../../style/components/styledText";
import {StyledCardBoxInfo} from "../../style/components/styledCardBoxInfo";
import {CurrencyCode, numberWithSpaces} from "../../utils/currency";
import getSymbolFromCurrency from 'currency-symbol-map'
import {StyledNumber} from "../../style/components/styledNumber";
import {Sparkline} from "../../graph/sparkline/sparkline";
import {Point} from "../../graph/sparkline/sparklineDrawer";

export const CryptoCardInfo = ({data, currency}: {data: CoinMarkedSparkline, currency: CurrencyCode}) => {
    const removeSign = (num: number) => num < 0 ? num *= -1 : num;
    const sparklineData = data.sparkline_in_7d?.price.map<Point>((price, index) => ({
        x: index,
        y: price,
    }))
    return (
    <div>
        <StyledCardBoxInfo>
            <StyledImage src={data.image} />
            <StyledTextBox>
                <StyledText styleText='title'>
                    {data.symbol}-{currency.toUpperCase()}
                </StyledText>
                <StyledText styleText='normal'>
                    {data.name}
                </StyledText>
            </StyledTextBox>
            <StyledTextBox width={200}>
                <StyledNumber styleText='title' sign={data.price_change_24h >= 0 ? 'up' : 'down'}>
                    {numberWithSpaces(data.price_change_24h || 0)}
                </StyledNumber>
                <StyledText styleText='normal'>
                    Price change 24h
                </StyledText>
            </StyledTextBox>
            <StyledTextBox>
                <Sparkline data={sparklineData} info={data} currency={currency} width={150} height={50} isPreview scaleY={1.05} />
            </StyledTextBox>
            <StyledTextBox>
                <StyledText styleText='title'>
                    {`${getSymbolFromCurrency(currency)}${numberWithSpaces(data.current_price || 0)}`}
                </StyledText>
                <StyledNumber styleText='normal' sign={data.price_change_percentage_24h >= 0 ? 'up' : 'down'}>
                    {Math.round(removeSign(data?.price_change_percentage_24h ?? 0) * 100) / 100 + '%'}
                </StyledNumber>
            </StyledTextBox>
        </StyledCardBoxInfo>
    </div>
    );
}
