import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const ArrowBack = styled.div`
  .backArrow {
    cursor: pointer;
    max-width: 80px;
    i {
      color: #4b4998;
      margin-right: 4px;
    }
    span {
      font-size: 16px;
      font-weight: 400;
      color: #494da1;
    }
    &:hover {
      i,
      span {
        color: #72bfef;
      }
    }
  }
`;

export const StyledGameItem = styled(Link)`
  display: flex;
  cursor: pointer;
  color: #fff;
  margin-bottom: 24px;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  flex-direction: column;
  text-decoration: none;
  position: relative;
  padding-bottom: 44px;

  img {
    margin: 0;
    border: none;
    width: 100%;
    object-fit: cover;
  }

  section {
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    min-height: 44px;
    max-height: 44px;
    transition: all 0.3s ease;
    padding: 10px 0 10px 10px;
    background: linear-gradient(46deg, #242a59, #2e3572);
    position: absolute;

    p {
      font-size: 14px;
      font-weight: 400;
      color: #82acf1;
      margin: 0 10px 0 0;
      line-height: 24px;
    }

    ul {
      display: flex;

      li {
        display: flex;
        align-items: center;
        margin-right: 7px;
        margin-top: 7px;

        img {
          width: 22px;
          height: 22px;
        }

        p {
          display: none;
          font-size: 12px;
          font-weight: 400;
          color: #486ca7;
          text-transform: capitalize;
        }
      }
    }
  }

  &:hover {
    section {
      min-height: 90px;
      max-height: 180px;
    }

    ul {
      display: contents;
    }

    p {
      display: contents;
    }

    img {
      margin-right: 10px;
    }
  }
`;

// 首页最热门游戏
export const HomePageHotGameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-bottom: 12px;
  overflow: auto;
  flex: 1;
  justify-content: space-between;
  ${StyledGameItem} {
    width: 32%;
  }
`;
