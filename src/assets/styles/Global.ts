import { css } from '@emotion/react';

export const StyledGlobal = css`
  * {
    user-select: none;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    ::-webkit-scrollbar-button {
      width: 4px;
      height: 0;
    }

    ::-webkit-scrollbar-track {
      background: 0 0;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #2e3570;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      border-radius: 3px;
    }
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Microsoft YaHei', 'Microsoft YaHei UI', '微软雅黑', 'Hiragino Sans GB', 'Hiragino Sans GB W3', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
  }
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;
