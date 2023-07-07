import { Button, Form, } from 'antd';
import React, { FC } from 'react';
import { useRegister } from './hooks';
import AccountInputFormItem from './AccountInputFormItem';
import { StyledLoginForm } from './styled';
import VerifyCodeInputFormItem from './VerifyCodeInputFormItem';
import PasswordInputFormItem from './PasswordInputFormItem';
import { userRegister } from '@/controllers/user.controller';

type UserRegisterProps = {};

const UserRegister: FC<UserRegisterProps> = () => {
  const { loginLoading, setLoginLoading, validateFields, form } = useRegister();
  const onUserRegister = async () => {
    setLoginLoading(true);
    const { account, code, pwd, codeSessionId } = await validateFields(['account', 'code', 'pwd', 'codeSessionId']);
    await userRegister({
      username: account,
      code,
      password: pwd,
      uuid: codeSessionId,
    });
    setLoginLoading(false);
  };
  return (
    <StyledLoginForm onFinish={onUserRegister} form={form}>
      <AccountInputFormItem />
      <VerifyCodeInputFormItem form={form} />
      <PasswordInputFormItem placeholder="设置密码(请输入6-12位数字或字母)" />
      <Form.Item>
        <Button htmlType="submit" type="primary" block loading={loginLoading}>
          注册并登录
        </Button>
      </Form.Item>
    </StyledLoginForm>
  );
};

export default UserRegister;
