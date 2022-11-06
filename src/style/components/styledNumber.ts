import styled from "styled-components";

export interface StyledNumberProps {
    sign: 'up' | 'down';
    styleText: 'normal' | 'title';
}

export const StyledNumber = styled.div<StyledNumberProps> `
    color: ${props => props.sign === 'up' ? 'green' : 'red'};
    font-size: ${props => props.styleText === "title" ? '1.2rem' : '1rem'};
    font-weight: ${props => props.styleText === "title" ? 'bold' : 'normal'};
`
