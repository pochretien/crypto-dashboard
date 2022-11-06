import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Point, SparklineData, SparklineDrawer} from './sparklineDrawer'
import {ToolTip} from "../../components/tooltip";
import {StyledCanvas} from "../../style/components/styledCanvas";
import {CoinMarkedSparkline} from "../../api/coingeckoInterface";
import {CurrencyCode, numberWithSpaces} from "../../utils/currency";
import getSymbolFromCurrency from "currency-symbol-map";
import {subtractHours} from "../../utils/date";

export interface SparklineProps {
  width?: number;
  height?: number;
  data: SparklineData;
  scaleY?: number;
  info: CoinMarkedSparkline;
  currency: CurrencyCode;
  isPreview?: boolean;
}

export const Sparkline = ({ width = 300, height = 100, data = [], info, currency, scaleY, isPreview = false }: SparklineProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [redraw, setRedraw] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<Point | undefined>(undefined);
  const [tooltipValues, setTooltipValues] = useState<{ value: number, date: string }>(null);

  const getCanvas = () => {
    return canvasRef.current;
  }

  const getContext = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      return canvas?.getContext('2d') ?? undefined;
    }
    return undefined;
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const xPixel = e.clientX - e.currentTarget.offsetLeft;
    const yPixel = e.clientY - e.currentTarget.offsetTop;
    const context = getContext(getCanvas());
    if (context && width && height) {
      clearDraw();
      const {value, position} = SparklineDrawer.drawData(context, data, width, height, scaleY, {x: xPixel, y: yPixel});
      const currentDate = subtractHours((data.length - 1) - position, new Date(info.last_updated as string));
      setTooltipValues({
        value,
        date: currentDate.toLocaleString(),
      });
      setMousePosition({x: e.pageX, y: e.pageY});
    }
  }

  const clearDraw = () => {
    const canvas = getCanvas();
    const context = getContext(canvas);
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setMousePosition(undefined);
    }
  }

  const drawWithoutPositionLine = () => {
    clearDraw();
    setRedraw(!redraw);
  }


  useEffect(() => {
    const canvas = getCanvas();
    if (canvas && width && height) {
      canvas.width = width;
      canvas.height = height;
      const context = getContext(canvas);
      // Our first draw
      if (context) {
        clearDraw();
        SparklineDrawer.drawData(context, data, width, height, scaleY)
      }
    }
  }, [redraw])

  if (!data.length) {
    return <div>No data!</div>
  }
  const Tooltip = () => {
    if (mousePosition) {
      return (
          <ToolTip x={mousePosition.x} y={mousePosition.y} visible={!!mousePosition}>
            <div>{`${getSymbolFromCurrency(currency)}${numberWithSpaces(Math.round((tooltipValues.value || 0) * 1000000) / 1000000)}`}</div>
            <div>{tooltipValues.date}</div>
          </ToolTip>
      );
    }
    return null;
  }
  if (isPreview) {
    return (
        <div>
          <StyledCanvas ref={canvasRef} height={height} width={width} isPreview={true} />
        </div>
    )
  }
  return (
      <div>
        {Tooltip()}
        <StyledCanvas ref={canvasRef} height={height} width={width} onMouseMove={onMouseMove} onMouseLeave={drawWithoutPositionLine} onScroll={drawWithoutPositionLine} isPreview={false} />
      </div>
  );
}
