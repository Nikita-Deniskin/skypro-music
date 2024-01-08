import styled, { css } from 'styled-components'

const btnMargins = {
  prev: css`
    margin-right: 23px;
  `,
  play: css`
    margin-right: 23px;
  `,
  pause: css`
    margin-right: 23px;
  `,
  next: css`
    margin-right: 28px;
    fill: #a53939;
  `,
  repeat: css`
    margin-right: 24px;
  `,
  shuffle: css`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  `,
  like: css`
    padding: 5px;
    margin-left: 28.5px;
  `,
  dislike: css`
    margin-left: 28.5px;
  `,
  volume: css`
    margin-right: 17px;
  `,
  tracklike: css`
    margin-right: 17px;
    padding: 0;
  `,
}

const btnMixin = (name) => {
  const styles = btnMargins[name]
  return styles
}

export const BtnDiv = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  ${(props) => btnMixin(props.$style)}
`
const btnSvgSizes = {
  prev: css`
    width: 15px;
    height: 14px;
  `,
  play: css`
    width: 22px;
    height: 20px;
  `,
  pause: css`
    width: 22px;
    height: 20px;
    flex-shrink: 0;
  `,
  next: css`
    width: 15px;
    height: 14px;
  `,
  repeat: css`
    width: 18px;
    height: 12px;
    fill: transparent;
  `,
  shuffle: css`
    width: 19px;
    height: 12px;
    fill: transparent;
  `,
  like: css`
    width: 14px;
    height: 12px;
    fill: transparent;
    stroke: #696969;
    &:hover {
      fill: #696969;
    }
    &:active {
      fill: #696969;
    }
  `,
  dislike: css`
    width: 14.34px;
    height: 13px;
    fill: transparent;
    stroke: #696969;
    &:hover {
    }
    &:active {
      fill: #696969;
    }
  `,
  volume: css`
    width: 13px;
    height: 18px;
    fill: transparent;
    stroke: none;
    &:hover {
      stroke: none;
    }
  `,
  tracklike: css`
    width: 14px;
    height: 12px;
    fill: ${(props) => (props.$active ? '#b672ff' : 'transparent')};
    stroke: ${(props) => (props.$active ? '#b672ff' : '#696969')};
    &:hover {
      fill: #b672ff;
    }
    &:active {
      fill: #b672ff;
      stroke-width: 1px;
      stroke: #b672ff;
    }
  `,
}
const btnSvgMixin = (name) => {
  const styles = btnSvgSizes[name]
  return styles
}
export const BtnSvg = styled.svg`
  fill: #d9d9d9;
  transition: all 0.3s;
  stroke: ${(props) => (props.$active ? '#FFFFFF' : '#696969')};
  &:hover {
    cursor: pointer;
    fill: #696969;
    stroke: #acacac;
    transform: scale(1.3);
  }
  &:active {
    fill: #696969;
    stroke: #fff;
  }
  ${(props) => btnSvgMixin(props.$style)}
`
