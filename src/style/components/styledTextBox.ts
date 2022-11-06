import styled from "styled-components";

export interface StyledTextBoxProps {
    isLast?: boolean;
    width?: number;
}

export const StyledTextBox = styled.div<StyledTextBoxProps> `
    width: ${props => `${props.width}px` || '150px'};
    min-width: 150px;
    display: flex;
    flex-direction: column;
    margin-left: ${props => !!props.isLast ? '0px' : '30px'}
`
