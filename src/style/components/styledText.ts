import styled from "styled-components";

export interface StyledBoxInfoProps {
    styleText: 'normal' | 'title';
}


export const StyledText = styled.div<StyledBoxInfoProps> `
  font-weight: ${props => props.styleText === "title" ? 'bold' : 'normal'};
  font-size: ${props => props.styleText === "title" ? '1.2rem' : '1rem'};
  margin-bottom: ${props => props.styleText === "title" ? '5px' : '0px'};;
`
