import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CDKPageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 14px 24px;
  box-sizing: border-box;
  .title {
    margin-top: 25px;
    font-size: 30px;
    font-family: Source Han Sans SC;
    font-weight: bold;
    color: #a1feff;
  }
`;

export const CDKInputBox = styled.div`
  display: flex;
  margin-top: 20px;
  input {
    box-sizing: border-box;
    padding-left: 50px;
    width: 300px;
    height: 37px;
    background: rgba(35, 41, 89, 0.38);
    border: 1px solid #2b3161;
    border-radius: 19px;
    color: #a1feff;
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
  button {
    margin-left: 20px;
    cursor: pointer;
    border: none;
    width: 120px;
    height: 37px;
    border-radius: 18.5px;
    font-size: 15px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #a1feff;
    background: #3b3cac;
  }
  div {
    position: relative;
  }
  img {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    object-fit: cover;
  }
`;

export const RecordHistory = styled.div`
  margin-top: 30px;
  .recordTitle {
    font-size: 20px;
    font-family: Source Han Sans SC;
    font-weight: bold;
    color: #767bde;
  }
  .recordTableHeader {
    margin-top: 12px;
    display: flex;
    box-sizing: border-box;
    padding-left: 70px;
    padding-right: 180px;
    align-items: center;
    justify-content: space-between;
    width: 1032px;
    height: 41px;
    background: #232959;
    box-shadow: 0px 2px 4px 0px rgba(16, 20, 44, 0.36);
    border-radius: 4px;
    color: #72bfef;
    i {
      margin-right: 4px;
    }
  }
  .recordTable {
    box-sizing: border-box;
    overflow: auto;
    margin-top: 10px;
    width: 100%;
    height: 330px;
    background: #1d224b;
    box-shadow: 0px 2px 4px 0px rgba(16, 20, 44, 0.36);
    border-radius: 4px;
    &::-webkit-scrollbar-thumb {
      background: #2e3570;
      border-radius: 3px;
    }
    .noData {
      margin-top: 90px;
      .ant-empty-image {
        filter: opacity(40%);
      }
      .ant-empty-description {
        color: #72bfef;
      }
    }
    .recordItem {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding-left: 70px;
      padding-right: 180px;
      .recordData {
        height: 100%;
        font-size: 14px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #72bfef;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid;
        border-image: linear-gradient(to right, #232959, #303673 50%, #232959 100%) 1;
      }
    }
  }
`;
