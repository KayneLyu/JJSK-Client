import styled from '@emotion/styled';
import { Button, Form, Modal, Result, Tabs } from 'antd';

export const StyledLogin = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    background: linear-gradient(to right, #1e2050, #26296a);
  }
  .ant-modal-close {
    color: #e0e0e0;
  }
`;

export const StyledLoginLeft = styled.aside`
  font-size: 12px;
  font-weight: 700;
  color: #898888;
  min-width: 250px;
  margin-right: 40px;
  .anticon {
    font-size: 20px;
    margin-bottom: 18px;
  }
  b {
    color: #161616;
    font-size: 15px;
    font-weight: 600;
    margin-right: 12px;
  }
`;

export const StyledLoginMain = styled.main``;

export const StyledLoginForm = styled(Form)`
  .ant-input-group.ant-input-group-compact {
    display: flex;
  }
  .ant-input {
    height: 42px;
    background: #232959;
    border: none;
    color: #494da1;
    ::placeholder {
      color: #494da1;
    }
  }
  .ant-input-affix-wrapper {
    background: #232959;
    border: none;
    > input.ant-input {
      height: 32px;
    }
  }
  .ant-input-suffix button {
    color: #494da1;
    :not(.ant-btn-link) {
      background: linear-gradient(to right, #3b38a7, #3a49c2);
      border: none;
      color: #fff;
    }
  }
  button[type='submit'] {
    background: linear-gradient(to right, #3b38a7, #3a49c2);
    border: none;
  }
  .ant-form-item-label > label {
    color: #666bcf;
  }
`;

export const StyledLoginTabs = styled(Tabs)`
  .ant-tabs-tab {
    padding-top: 0;
    padding-bottom: 0;
    color: #666bcf;
    font-size: 14px;
    height: 38px;
    line-height: 38px;
    &-active {
      .ant-tabs-tab-btn {
        color: #a1feff !important;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .ant-tabs-nav:before {
    border-color: #666bcf;
  }
  .ant-tabs-ink-bar {
    background: #a1feff;
  }
`;

export const StyledLoginSection = styled.section`
  header {
    line-height: 38px;
    font-size: 20px;
    font-weight: bold;
    color: #666bcf;
    margin-bottom: 24px;
    button {
      padding-left: 0;
    }
  }
`;

export const StyledUserRegisterButton = styled(Button)`
  padding-right: 0;
  float: right;
`;

export const StyledForgetPasswordSuccess = styled(Result)`
  .ant-result-title {
    color: #666bcf;
  }
  button {
    background: linear-gradient(to right, #3b38a7, #3a49c2);
    border: none;
    &:hover {
      background: linear-gradient(to right, #3b38a7, #3a49c2);
      border: none;
    }
  }
`;

export const StyledVerifyCodeModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    background: linear-gradient(to right, #1e2050, #26296a);
  }
  .ant-modal-close {
    color: #e0e0e0;
  }
  .ant-modal-header {
    background-color: transparent;
  }
  .ant-modal-title {
    color: #666bcf;
  }
`;
