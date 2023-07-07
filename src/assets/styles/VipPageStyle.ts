import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const VipPageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 23px 24px;
  box-sizing: border-box;
  .cdkTips {
    font-size: 14px;
    font-weight: 400;
    color: #494da1;
    span {
      font-size: 14px;
      font-weight: 400;
      color: #878dff;
      cursor: pointer;
    }
  }
  .payTypeBox {
    display: flex;
    align-items: center;
    margin-top: 24px;
  }
  .payForType {
    flex: 1;
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    background: #232959;
    box-shadow: 0px 2px 4px 0px rgba(16, 20, 44, 0.36);
  }
  .illustrate {
    display: flex;
    margin-top: 23px;
    .platform_support,
    .platform_choose,
    &_right {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: #1e234b;
      box-shadow: 0px 2px 4px 0px rgba(16, 20, 44, 0.36);
    }
    p {
      width: 100%;
      text-align: left;
      font-size: 22px;
      font-weight: bold;
      color: #a1feff;
      margin-top: 0;
    }
    .desc {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #72bfef;
    }
    .illustrate_left {
      justify-content: space-between;
      .platform_support {
        width: 480px;
        border-radius: 4px;
        box-shadow: none;
      }
      .platform_choose {
        margin-top: 30px;
        width: 480px;
        border-radius: 4px;
        img {
          margin-top: 15px;
          width: 386px;
          height: 131px;
          object-fit: cover;
        }
      }
    }
    &_right {
      margin-left: 30px;
      flex: 1;
      border-radius: 4px;
      box-shadow: none;
    }
  }
`;

const PayCardTypeActive = css`
  filter: brightness(100%);
  margin-top: -15px;
`;

export const VipTypeCard = styled.div<{ isActive: Boolean }>`
  position: relative;
  cursor: pointer;
  width: 32%;
  filter: brightness(50%);
  ${props => (props.isActive ? PayCardTypeActive : '')};
  &:hover {
    filter: brightness(100%);
    transition: all 0.3s ease;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .textBox {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    .typeOfText {
      margin-top: 25px;
      margin-left: 19px;
      font-size: 26px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0px 1px 3px rgba(139, 72, 60, 0.52);
    }
    .daysOfText {
      margin-top: 25px;
      margin-left: 19px;
      span {
        font-size: 26px;
        font-weight: bold;
        font-style: italic;
        color: #ffffff;
        text-shadow: 0px 1px 3px rgba(139, 72, 60, 0.52);
      }
      span:first-of-type {
        font-size: 42px;
        margin-right: 4px;
      }
    }
    .priceOfText {
      padding-right: 22px;
      margin-top: 30px;
      font-size: 26px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0px 1px 3px rgba(139, 72, 60, 0.52);
      text-align: right;
    }
  }
`;

export const VipPayQRcode = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 10px;
  align-items: center;
  width: 262px;
  border-radius: 3px;
  background: linear-gradient(46deg, #262d65, #2f3777);
  box-shadow: 0px 2px 4px 0px rgba(16, 20, 44, 0.36);
  /* .QRcode {
  } */
  .QRcodePayType {
    display: flex;
    margin-top: 8px;
    width: 152px;
    justify-content: space-between;
  }
  .paymentAmount {
    margin-top: 18px;
    p {
      font-size: 14px;
      font-weight: 400;
      color: #666bcf;
      span {
        margin-left: 2px;
        font-size: 21px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .agreement {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #494da1;
    span {
      font-size: 12px;
      font-weight: 400;
      color: #666bcf;
      cursor: pointer;
    }
  }
  .QRcode {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .QRcodeTips {
      position: absolute;
      height: 150px;
      line-height: 150px;
      cursor: pointer;
      color: #fff;
      width: 100%;
      text-align: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const QRCodeBox = styled.div<{ firstTimeLoad: Boolean }>`
  width: 100%;
  height: 100%;
  filter: ${props => (props.firstTimeLoad ? 'blur(5px) brightness(40%)' : '')};
`;

const payActive = css`
  background: linear-gradient(90deg, #1378fe, #2f91ff);
  box-shadow: 0px 0px 0px 1px rgba(48, 42, 91, 0.81);
  border-radius: 7px;
  span {
    font-weight: 400;
    color: #ffffff;
  }
`;

export const QRcodePayFor = styled.div<{ payForActive: Boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 25px;
  background: #212460;
  border: 1px solid #393d88;
  border-radius: 7px;
  cursor: pointer;
  i {
    margin-right: 5px;
    font-size: 17px;
  }
  ${props => (props.payForActive ? payActive : '')}
  /* span { */
    font-size: 12px;
  font-weight: 400;
  color: #666bcf;
  /* } */
`;

export const StyledUserCz = styled.section`
  color: #a1feff;
  font-size: 18px;
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  svg {
    margin-right: 6px;
  }
  &:after {
    flex: 1;
    content: '';
    border-bottom: 1px dashed #a1feff;
    margin-left: 12px;
  }
`;

export const StyledCheat = styled.section`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  color: #a1feff;
  font-size: 14px;
  align-items: center;
  span.anticon {
    margin-top: 0;
  }
  .item {
    flex: 1;
  }
  .ant-segmented {
    background-color: #212460;
    border-radius: 0;
    color: #72bfef;
    border: 1px solid #3e44ac;
    padding: 0;
    .ant-segmented-item {
      border-radius: 0;
      &-selected {
        background-color: #3e44ac;
      }
    }
  }
  .ant-switch {
    background-color: #212460;
    border: 1px solid #3e44ac;
    line-height: 28px;
    height: 30px;
    display: flex;
    border-radius: 12px;
    .ant-switch-handle {
      top: 5px;
    }
    .ant-switch-inner-unchecked {
      margin-top: -28px;
    }
  }
  .ant-slider {
    max-width: 80%;
  }
`;
