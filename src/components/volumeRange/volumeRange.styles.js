import { styled } from 'styled-components'


export const volumeProgressLine = styled.input`
-webkit-appearance: none;
appearance: none;
width: 110px;
cursor: pointer;
outline: none;
height: 2px;
background: #797979;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 12px;
    width: 12px;
    background-color: #1A1A1A;
    border-radius: 50%;
    border: 2px solid white;
    transition: .2s ease-in-out;
  }
  &::-webkit-slider-thumb:hover {
transform: scale(1.2);
background-color: #b672ff;

  }

 &::-moz-range-thumb {
    height: 12px;
    width: 12px;
    background-color: #f50;
    border-radius: 50%;
    border: 2px solid #fff;
    transition: .2s ease-in-out;
  }
  
`