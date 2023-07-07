import styled from '@emotion/styled';
import bg1 from '@/assets/img/web/bg1.png';
import bg2 from '@/assets/img/web/bg2.png';
import { Modal } from 'antd';

export const StyledLayout = styled.section`
  height: 100%;
  overflow: auto;
`;

export const StyledHeader = styled.header`
  height: 800px;
  background-color: #0a0a23;
  background-image: url(${bg1});
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledHeaderTop = styled.section`
  height: 122px;
  width: 1400px;
  display: flex;
  align-items: center;
  background-color: rgba(10, 10, 35, 0.92);
  .logo {
    width: 200px;
  }
  .download {
    width: 140px;
    img {
      width: 100%;
    }
  }
  .nav {
    flex: 1;
    padding-left: 120px;
    a {
      color: #706e8a;
      line-height: 45px;
      text-decoration: none;
      padding: 0 20px;
      font-size: 20px;
      position: relative;
      transition: all 0.2s ease;
      &.active {
        color: #fff;
        &:after {
          content: '';
          position: absolute;
          width: 24px;
          height: 4px;
          background: #a1f1ff;
          border-radius: 2px;
          left: calc(50% - 12px);
          bottom: -8px;
        }
      }
    }
  }
`;

export const StyledContent = styled.main`
  background-image: url(${bg2});
  background-size: 100% auto;
  background-position-y: -41.61458333vw;
`;

export const StyledFooter = styled.footer`
  background-image: linear-gradient(0deg, #0b0b2c, #0f0f33);
  .content {
    width: 1000px;
    margin: auto;
    padding: 30px 0;
    color: #292761;
    font-size: 14px;
  }
  .map {
    display: flex;
    justify-content: space-between;
    a {
      cursor: pointer;
      text-decoration: none;
      color: #292761;
    }
  }
  .about {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    a {
      text-decoration: none;
      color: #2e2b95;
    }
  }
  .name {
    font-size: 20px;
  }
  .cName {
    margin: 12px 0;
  }
  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      margin: 0 20px;
      text-decoration: none;
      color: #2e2b95;
      font-size: 16px;
    }
  }
`;

export const StyledHeaderInfo = styled.section`
  display: flex;
  width: 1400px;
  overflow: hidden;
  margin-top: 64px;
  aside {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  a {
    display: flex;
    img {
      width: 100%;
    }
  }
`;

export const StyledHomeContent = styled.section`
  padding-top: 20px;

  .part1 {
    width: 1400px;
    margin: 80px auto 24px;
    display: flex;
    justify-content: flex-end;

    img {
      width: 700px;
    }
  }
  .gameImgs {
    position: relative;
    height: 520px;
    overflow: hidden;
    img {
      position: absolute;
      background-color: #232949;
      border: 1px solid #6bcde5;
    }
  }
  .toList {
    display: flex;
    width: 180px;
    margin: 40px auto;

    img {
      width: 100%;
    }
  }
  .part2 {
    width: 1400px;
    margin: 120px auto;
    > img {
      width: 578px;
      margin-bottom: 38px;
    }
    section {
      display: flex;
      justify-content: space-between;
      aside {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
          width: 624px;
        }
      }
      > img {
        width: 752px;
      }
    }
  }
  .part3 {
    width: 1400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    > img {
      width: 458px;
      margin-bottom: 50px;
      align-self: flex-end;
    }
    section {
      display: flex;
      justify-content: space-between;
      line-height: 24px;
      color: #72bfef;
      font-size: 20px;
      div {
        position: relative;
      }
      img {
        width: 682px;
      }
      span {
        position: absolute;
        display: flex;
        width: 600px;
        left: 40px;
        top: 74px;
      }
    }
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    background: linear-gradient(to right, #1e2050, #26296a);
  }
  .ant-modal-header {
    background-color: transparent;
  }
  .ant-modal-close {
    color: #e0e0e0;
  }
  .ant-modal-title {
    text-align: center;
    color: #494da1;
  }
  .ant-modal-body {
    max-height: 60vh;
    overflow: auto;
    color: #494da1;
  }
`;

export const StyledListSearch = styled.section`
  display: flex;
  flex-direction: column;
  width: 1400px;
  header {
    display: flex;
    align-items: center;
    font-size: 36px;
    color: #fff;
    margin-top: 60px;
    margin-bottom: 20px;
    b {
      font-size: 64px;
      margin: 0 4px;
      color: #494da1;
    }
  }
  .ant-input-affix-wrapper {
    width: 680px;
    background: #232959;
    border: none;
    border-radius: 50px;
    font-size: 20px;
    .ant-input-prefix {
      color: #494da1;
      margin: 0 8px;
    }
    > input.ant-input {
      height: 50px;
      background-color: transparent;
      color: #494da1;
      &::placeholder {
        color: #494da1;
      }
    }
  }
`;

export const StyledListGame = styled.section`
  width: 1400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  header {
    display: flex;
    height: 80px;
    align-items: center;
    color: #494da1;
  }
`;

export const StyledGameItem = styled.section`
  display: flex;
  margin-bottom: 12px;
  background-color: #364d79;
  align-items: center;
  color: #82acf1;
  img {
    width: 160px;
  }
  .name {
    margin-left: 24px;
    font-size: 20px;
    color: #82acf1;
    flex: 1;
  }
  .count {
    width: 100px;
    font-weight: bolder;
    font-size: 20px;
  }
  .platform {
    display: flex;
    width: 260px;
    div {
      display: flex;
      margin-right: 8px;
    }
    img {
      width: 24px;
      margin-right: 4px;
    }
  }
  .update {
    width: 100px;
  }
  .status {
    width: 100px;
    svg {
      color: #acff35;
      margin-right: 4px;
    }
  }
`;
