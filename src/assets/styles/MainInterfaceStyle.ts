import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const HomeBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// const containerHeight = document.body.clientHeight - 134;

export const MainInterfaceContainer = styled.div`
  flex: 1;
  background: linear-gradient(to bottom, #141837, #1c2243);
  overflow: hidden;
`;

export const MainInterfaceClientHeader = styled.header`
  display: flex;
  width: 100%;
  height: 80px;

  /* justify-content: space-between; */
  /* background-color: #222560; */
  background: linear-gradient(to right, #1e2050, #26296a);
`;
export const RedBuffLogo = styled.div`
  width: 140px;
  height: 31px;
  margin-top: 26px;
  margin-left: 27px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfoBox = styled.div<{ isVip: Boolean }>`
  margin-left: auto;
  margin-top: 30px;
  margin-right: 24px;
  display: flex;
  align-items: center;
  .concatServer {
    width: 101px;
    height: 27px;
    object-fit: cover;
    cursor: pointer;
  }
  .userAvatar {
    margin-right: 12px;
    width: 34px;
    height: 34px;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .userName {
    margin-right: 15px;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #666bcf;
    cursor: pointer;
  }
  .isVip {
    margin-right: 15px;
    width: 32px;
    height: 30px;
    cursor: pointer;
    filter: ${props => (props.isVip ? '' : 'grayscale(100%)')};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
