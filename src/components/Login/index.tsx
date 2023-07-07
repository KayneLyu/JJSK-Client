import React, { FC, useEffect, useState } from 'react';
import AccountLogin from './AccountLogin';
import ForgetPassword from './ForgetPassword';
import ForgetPasswordSuccess from './ForgetPasswordSuccess';
import { StyledLogin, StyledLoginMain, StyledLoginTabs } from './styled';
import UserChangePassword from './UserChangePassword';
import UserRegister from './UserRegister';
import VerifyCodeLogin from './VerifyCodeLogin';
import { useGlobalOperate, useGlobalState } from '@/stores';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
  const { loginModalVisible, loginModalType } = useGlobalState();
  const { closeLoginModal, showLoginModal } = useGlobalOperate();
  const [loginType, setLoginType] = useState<'register' | 'login'>('login');

  useEffect(() => {
    if (loginModalVisible) {
    }
  }, [loginModalVisible]);
  useEffect(() => {}, []);

  const onReturnAccountLogin = () => {
    showLoginModal(1);
    setLoginType('login');
  };
  const onLoginTypeChange = (tab: string) => {
    setLoginType(tab as 'register' | 'login');
  };
  return (
    <StyledLogin centered destroyOnClose maskClosable={false} open={loginModalVisible} onCancel={closeLoginModal} width={500} footer={null}>
      {[0, 4].includes(loginModalType) && <ForgetPassword onReturnLogin={onReturnAccountLogin} />}
      {loginModalType === 1 && (
        <StyledLoginTabs
          activeKey={loginType}
          onChange={onLoginTypeChange}
          items={[
            { label: '登录', key: 'login', children: <AccountLogin /> },
            { label: '注册', key: 'register', children: <UserRegister /> },
          ]}
        />
      )}
      {loginModalType === 3 && <UserChangePassword />}
      {loginModalType === 5 && <ForgetPasswordSuccess />}
    </StyledLogin>
  );
};

export default Login;
