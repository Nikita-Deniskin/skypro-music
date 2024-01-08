import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  &:before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  &:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}

a,
a:visited {
  text-decoration: none;
  font-family: 'StratosSkyeng', sans-serif;
  cursor: pointer;
}

ul li {
  list-style: none;
}

@font-face {
  font-family: 'StratosSkyeng';
  src: url('../public/fonts/StratosSkyeng.eot');
  src:
    local('StratosSkyeng'),
    local('StratosSkyeng'),
    url('../public/fonts/StratosSkyeng.eot?#iefix') format('embedded-opentype'), 
    url('../public/fonts/StratosSkyeng.woff2') format('woff2'),
    url('../public/fonts/StratosSkyeng.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'StratosSkyeng', sans-serif;
  color: #ffffff;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`
export default GlobalStyle