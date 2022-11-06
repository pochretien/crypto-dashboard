export interface Point {
  x: number;
  y: number;
}

export interface AxesPosition {
  deltaX: number;
  deltaY: number;
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

export type SparklineData = Point[]

const drawPositionLine = (
    context: CanvasRenderingContext2D,
    x: number,
    height: number
) => {
  context.save();
  context.beginPath();
  context.setLineDash([3, 10]);
  context.moveTo(x, 0);
  context.lineTo(x, height);
  context.strokeStyle = "#55a1e6";
  context.stroke();
  context.restore();
}

const drawDot = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number
) => {
  context.beginPath();
  context.moveTo(x, y);
  context.fillStyle = '#55a1e6';
  context.arc(x, y, 4, 0, 2 * Math.PI, true);
  context.fill();
}

const getClosestValue = (value: number, array: number[]) => {
  let index = 0;
  array.reduce((prev, curr, currentIndex)  => {
    if (Math.abs(curr - value) < Math.abs(prev - value)){
      index = currentIndex;
      return curr;
    }
    return prev;
  });
  return index;
}

export interface DataPosition {
  pixel: Point;
  value: Point;
}

const drawData = (
  context: CanvasRenderingContext2D,
  data: SparklineData,
  width: number,
  height: number,
  scale: number = 1,
  mousePositionPixel: Point | undefined = undefined,
) => {
  const {maxY, deltaY, deltaX} = getAxesPosition(data, scale)
  const axeXRatioPixel = ratioPixelAxe(width, deltaX)
  const axeYRatioPixel = ratioPixelAxe(height, deltaY)

  const dataPosition: Array<DataPosition> = [] ;
  const positionXList: number[] = [];

  context.beginPath();
  data.forEach((point: Point, index: number) => {
    const x = point.x * axeXRatioPixel;
    const y = (maxY - point.y) * axeYRatioPixel;
    if (index === 0) {
      context.moveTo(x,y);
    } else {
      context.lineTo(x,y);
    }
    positionXList.push(x);
    dataPosition.push({pixel: {x, y}, value: point});
  });
  context.strokeStyle = "#ce4800";
  context.lineWidth = 1;
  context.stroke();

  if (mousePositionPixel && positionXList.length && dataPosition) {
    const position = getClosestValue(mousePositionPixel.x, positionXList);
    const point = dataPosition[position];
    drawDot(context, point.pixel.x, point.pixel.y);
    drawPositionLine(context, point.pixel.x, height);
    return {
      value: point.value.y,
      position,
    };
  }

  return null;
}

const getAxesPosition = (data: SparklineData = [], scaleY: number = 1): AxesPosition => {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  data.forEach((point: Point) => {
    minX = Math.min(point.x, minX)
    minY = Math.min(point.y, minY)

    maxX = Math.max(point.x, maxX)
    maxY = Math.max(point.y, maxY)
  })
  const scaleNumberY = (maxY - minY) * (scaleY - 1);
  minY = minY - scaleNumberY;
  maxY = maxY + scaleNumberY;
  return {
    deltaX: ((maxX - minX) * 100) / 100,
    deltaY: ((maxY - minY) * 100) / 100,
    maxX,
    maxY,
    minX,
    minY,
  }
}

const ratioPixelAxe = (pixelSize: number, axeSize: number) => {
  return ((pixelSize / axeSize) * 100) / 100
}

export const SparklineDrawer = {
  drawData,
}
