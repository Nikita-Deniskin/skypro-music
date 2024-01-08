import { styled } from "styled-components";

export const ErrorBlock = styled.div`
width: 100%;
margin-top: 200px;
display: flex;
flex-direction: column;
justify-content: center;
    align-items: center;
`
export const ErrorCode = styled.div`
font-variant-numeric: lining-nums proportional-nums;
font-feature-settings: 'clig' off, 'liga' off;
font-size: 160px;
font-style: normal;
line-height: 168px; /* 105% */
`

export const ErrorTitle = styled.div`
color: #FFF;
font-variant-numeric: lining-nums proportional-nums;
font-size: 32px;
line-height: 40px; /* 125% */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 8px;
`

export const ErrorText = styled.p`
color: #4E4E4E;
text-align: center;
font-variant-numeric: lining-nums proportional-nums;
width: 431px;
/* Desk • 1366/Text M */
font-size: 18px;
line-height: 24px; /* 133.333% */
letter-spacing: -0.054px;
margin: 19px 0 36px 0
`
export const ErrorReturnBtn = styled.button`
width: 278px;
height: 52px;
background-color: #580ea2;
border-radius: 6px;
border: none;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
color: #FFF;
font-variant-numeric: lining-nums proportional-nums;
font-size: 18px;
font-style: normal;
line-height: 24px; /* 133.333% */
letter-spacing: -0.054px;
&:hover {
  background-color: #3f007d;
}
&:active {
  background-color: #271a58;
}
`