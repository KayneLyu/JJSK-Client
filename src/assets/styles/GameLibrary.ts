import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Checkbox, Pagination } from 'antd';
import { StyledGameItem } from '@/assets/styles/ComponentsStyle';

export const GameLibraryContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow: hidden;
  .searchGame {
    position: relative;

    .mirror {
      width: 17px;
      height: 19px;
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
    }

    input {
      width: 300px;
      height: 37px;
      color: #fff;
      line-height: 37px;
      font-size: 16px;
      background: rgba(35, 41, 89, 0.38);
      border: 1px solid #2b3161;
      border-radius: 19px;
      padding-left: 44px;
      box-sizing: border-box;
      caret-color: #a1feff;

      &::placeholder {
        font-size: 14px;
        font-family: NSimSun;
        font-weight: 400;
        color: #494da1;
      }

      &:focus {
        outline: 0;
      }
    }

    .GamePagenationBox {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export const SelectGameButtonBox = styled.div`
  display: flex;
  margin-top: 25px;
  margin-bottom: 19px;
  align-items: flex-end;
  justify-content: space-between;
  .gameType {
    display: flex;
  }
  .myGameIcon {
    width: 36px;
    height: 31px;
    object-fit: cover;
    /* margin-left: 17px; */
  }
`;

export const GameTypeCheckBox = styled(Checkbox.Group)`
  span {
    font-size: 14px;
    font-family: NSimSun;
    font-weight: 400;
    color: #494da1;
  }
  .ant-checkbox-inner {
    background-color: transparent;
    border: 1px solid #494da1;
  }
`;

const SelectGameButtonActive = () => css`
  /* width: 140px;
height: 46px;
border-radius: 23px; */
  font-size: 16px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: #a1feff;
  background: linear-gradient(to right, #3b38a7, #3a49c2);
`;

export const SelectGameButton = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 135px;
  height: 40px;
  background: #212460;
  margin-right: 14px;
  border-radius: 25px;
  font-size: 16px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: #666bcf;
  border: 1px solid #393d88;
  cursor: pointer;
  ${props => (props.isActive ? SelectGameButtonActive() : '')}
`;

export const GamePagination = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  // active样式
  .ant-pagination-item-active {
    background: #454ab1 !important;
    border: 1px solid #2b3161 !important;
    a {
      color: #fff !important;
    }
  }
  .ant-pagination-options {
    .ant-select-selector {
      background: #2c2f67;
      color: #666bcf;
      border: none;
    }
    .ant-select-arrow {
      color: #666bcf;
    }
  }

  .ant-pagination-item {
    background: #2c2f67;
    a {
      color: #666bcf;
    }
    &:hover {
      background: #454ab1 !important;
      a {
        color: #fff;
      }
    }
  }
  // 前进后退按钮
  .ant-pagination-item-ellipsis {
    color: #494da1 !important;
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    background: #2c2f67;
    .ant-pagination-item-link {
      color: #666bcf;
      &:hover {
        background: #454ab1 !important;
        color: #fff;
      }
    }
  }
  .ant-pagination-options-quick-jumper {
    color: #666bcf;
    input {
      color: #fff;
      border-radius: 3px;
      background: #2c2f67;
      border: none;
      caret-color: #a1feff;
    }
  }
`;

export const GameListContent = styled.section`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  padding-right: 10px;
  margin-right: -24px;
  ${StyledGameItem} {
    width: 24%;
    margin-right: 12px;
  }
`;
