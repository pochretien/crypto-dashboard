import styled from "styled-components";
import React from "react";

export interface TooltipProps extends React.PropsWithChildren {
    x: number;
    y: number;
    visible: boolean;
}

export const StyledTooltip = styled.div<TooltipProps> `
  position: absolute;
  left: ${props => `${props.x + 10}px`}; 
  top: ${props => `${props.y - 5}px`};
  letter-spacing: normal;
  text-align: left;
  text-align: start;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;
  display: inline-block;
  
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`

export const StyledTooltipInner = styled.div `
  max-width: 200px;
  padding: 3px 8px;
  color: #0e1111;
  text-align: center;
  background-color: #b5b6b7;
  border-radius: 2px;
`
