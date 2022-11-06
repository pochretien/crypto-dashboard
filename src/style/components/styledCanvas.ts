import styled from "styled-components";

export interface StyledCanvasProps {
    isPreview: boolean;
}

export const StyledCanvas = styled.canvas<StyledCanvasProps> `
    background-color: ${props => props.isPreview ? '#303132' : '#0e1111'};
`
