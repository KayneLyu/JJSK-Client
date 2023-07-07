import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const UserInfoPageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px 23px;
`;
export const UserInfoTable = styled.div`
  ul {
    margin-bottom: 10px;
  }
  .infoTitle {
    font-size: 20px;
    font-family: Source Han Sans SC;
    font-weight: bold;
    color: #767bde;
  }
  li {
    display: flex;
    font-size: 14px;
    font-family: NSimSun;
    font-weight: 400;
    color: #494da1;
    height: 55px;
    border-bottom: 1px solid #24295b;
    align-items: center;
    p {
      min-width: 150px;
    }
    img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
    }
    button {
      width: 112px;
      height: 34px;
      background: #212460;
      border: 1px solid #393d88;
      border-radius: 17px;
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: #666bcf;
      margin-left: auto;
      &:hover {
        background: #3d3cab;
        border: 1px solid #393d88;
        color: #A1FEFF!important;
      }
    }
  }
`;
