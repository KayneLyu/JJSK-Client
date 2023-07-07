import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

export const HomePageContainer = styled.main`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 24px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const HomePageMainContent = styled.section`
  flex: 1;
  width: 1px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const HomePageHotGame = styled.div`
  width: 100%;
  margin-top: 15px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BannerOverSize = styled(Carousel)`
  border-radius: 10px;
  overflow: hidden;
`;

export const BannerOverItem = styled(Link)`
  height: 280px;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #364d79;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .tips {
    position: absolute;
    top: 25%;
    bottom: 10px;
  }
`;

export const HomePageContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .hotestGame {
    display: flex;
    height: 36px;
    align-items: center;

    svg {
      font-size: 21px;
      color: #a1feff;
      line-height: 21px;
    }
    span {
      margin-left: 5px;
      font-size: 22px;
      font-weight: bold;
      color: #a1feff;
    }
  }

  p:last-child {
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #494da1;
    &:hover {
      color: #a1feff;
      cursor: pointer;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 21px;
      width: 27px;
      height: 2px;
      background-color: #a1feff;
    }
  }
`;

// 首页侧边栏最热游戏
export const HomePageAsideContainer = styled.aside`
  margin-left: 28px;
  width: 340px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  header {
    display: flex;
    align-items: center;
    height: 31px;
    margin-top: 23px;
    font-size: 22px;
    font-weight: bold;
    color: #a1feff;
    margin-bottom: 8px;
    svg {
      margin-right: 4px;
    }
  }
  main {
    flex: 1;
    overflow: auto;
    background-color: #232959;
  }
`;

export const HomePageAsideItem = styled(Link)`
  position: relative;
  display: flex;
  vertical-align: middle;
  box-sizing: border-box;
  padding: 6px 0 6px 15px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  &:hover {
    background: linear-gradient(to right, #3d5396, #232959);
  }
  &:hover::after {
    content: '';
    display: block;
    overflow: visible;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 0;
    height: 0;
    border: 7px solid;
    border-color: transparent transparent transparent #a1feff;
  }
  .asideItemImage {
    width: 140px;
    margin-right: 10px;
  }
  .asideInfo {
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    span {
      height: 12px;
      font-size: 12px;
      line-height: 12px;
      font-weight: 400;
      color: #82acf1;
    }
  }
  .asideIcons {
    display: flex;
    height: 22px;
    align-items: center;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .itemIcon {
    width: 22px;
    height: 22px;
    margin-right: 7px;
  }
  .updateDate {
    flex: 1;
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    font-weight: 400;
    color: #486ca7;
  }
`;
// 轮播图
export const HomePageBannerBox = styled.div`
  width: 100%;
  margin-top: 23px;
  .slick-dots {
    justify-content: flex-end;
    padding-right: 5px;
  }
`;

// 轮播图按钮
export const test = css`
  li {
    width: 12px !important;
    button {
      height: 0 !important;
      &::after {
        content: '';
        display: block;
        margin: 0 auto;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #8ee8ff;
      }
    }
  }
`;
