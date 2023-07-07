import { Button } from 'antd';
import React, { FC } from 'react';
import { StyledForgetPasswordSuccess } from './styled';
import { useGlobalOperate } from '@/stores';

type ForgetPasswordSuccessProps = {};

const ForgetPasswordSuccess: FC<ForgetPasswordSuccessProps> = () => {
  const { showLoginModal } = useGlobalOperate();
  const toLogin = () => {
    showLoginModal(1);
  };
  return (
    <StyledForgetPasswordSuccess
      status="success"
      title={'找回密码成功！'}
      extra={[
        <Button block type="primary" onClick={toLogin}>
          现在去登录
        </Button>,
      ]}
    />
  );
};

export default ForgetPasswordSuccess;
