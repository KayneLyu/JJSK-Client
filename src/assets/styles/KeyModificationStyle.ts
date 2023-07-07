import { css } from '@emotion/css';
import styled from '@emotion/styled';
import hutao from '@/assets/img/hutao.png';
import { Button, Select, Steps } from 'antd';
export const KeyModificationContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a203f;
  background-image: linear-gradient(to top, rgb(28, 34, 67) 0%, rgb(28, 34, 67) 20%, rgb(28, 34, 67, 0.1) 100%), url(${hutao});
  backdrop-filter: blur(3px);
  background-repeat: no-repeat;
  background-position: center top / 100% 100%;
  .key_modification_content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: rgba(29, 29, 58, 0.9);
    box-sizing: border-box;
    padding: 15px 0 15px 23px;
  }

  .use_introduction {
  }
`;

export const KeyModifyBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .update_date {
    p {
      font-size: 14px;
      font-weight: 400;
      color: #494da1;
    }
    .last_date {
      margin-top: 4px;
    }
  }
  .divider {
    width: 100%;
  }
`;

export const StyledUseIntroduction = styled.section`
  box-sizing: border-box;
  padding: 24px 21px;
  width: 426px;
  background: rgba(34, 40, 86, 0.5);
  margin-left: 15px;

  .introduction_title {
    font-size: 20px;
    font-weight: bold;
    color: #767bde;
    margin-top: 0;
    margin-bottom: 12px;
  }

  .use_step {
    margin-top: 23px;
    width: 382px;
    height: 244px;
    background: #292f60;
    border-radius: 8px;
  }

  .check_box_set {
    margin-top: 21px;
  }

  .choose_checkbox {
    span {
      font-size: 14px;
      font-weight: 400;
      color: #72bfef;
    }
  }
  .disclaimer {
    cursor: pointer;
  }
`;

export const StyledGameTitle = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  .game_zh_name {
    font-size: 30px;
    font-weight: bold;
    color: #a1feff;
    margin: 0;
  }
  .game_en_name {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #72bfef;
  }
`;

export const StyledGameSupport = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  main {
    display: flex;
  }
  aside {
    font-size: 14px;
    color: #494da1;
  }
`;

export const StyledGameSupportPlatform = styled.a<{ active: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:not(:first-of-type) {
    margin-left: 12px;
  }
  img {
    width: 28px;
    margin-right: 4px;
  }
  span {
    color: ${props => (props.active ? '#a1feff' : '#767BDE')};
    font-weight: bolder;
    text-transform: capitalize;
  }
`;

export const StyledGameCheatList = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

export const StyledUseStep = styled(Steps)`
  border-radius: 8px;
  background-color: #292f60;
  padding: 20px;
  .ant-steps-item-finish {
    > .ant-steps-item-container {
      > .ant-steps-item-tail::after {
        background-color: #303873;
      }
      .ant-steps-item-content > {
        .ant-steps-item-title,
        .ant-steps-item-description {
          color: #72bfef;
        }
      }
    }
    .ant-steps-item-icon > .ant-steps-icon {
      .ant-steps-icon-dot {
        background-color: #fff;
      }
    }
  }
`;

export const StyledExitWD = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledStartButton = styled(Button)`
  background-color: transparent;
  margin-top: 20px;
  border: none;
  height: auto;
  outline: none;
  img {
    width: 100%;
  }
  &:disabled {
    opacity: 0.3;
  }
`;

export const cssProcessList = css`
  width: 100%;
  .ant-select-selector {
    background-color: #292f60;
  }
`;
