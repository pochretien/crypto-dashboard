import React, {FC} from "react";
import {TooltipProps, StyledTooltip, StyledTooltipInner} from "../style/components/styledTooltip";

export const ToolTip: FC<React.PropsWithRef<TooltipProps>> = ({children, x, y, visible}) => {
    return (
        <StyledTooltip x={x} y={y} visible={visible}>
            <StyledTooltipInner>
                {children}
            </StyledTooltipInner>
        </StyledTooltip>
    );
}
