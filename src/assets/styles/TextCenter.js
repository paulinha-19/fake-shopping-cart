import styled from "styled-components";

export const TextCenter = styled.p`
text-align: center;
font-weight: ${(props) => props.weight};
font-size: ${(props) => props.size};
margin-top: ${(props) => props.marginT};
margin-bottom: ${(props) => props.marginB};
`