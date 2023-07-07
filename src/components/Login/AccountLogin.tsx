import { Button, Form, Input, message } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { StyledLoginForm } from './styled';
import PasswordInputFormItem from './PasswordInputFormItem';
import { useGlobalOperate } from '@/stores';
import { userLogin } from '@/controllers/user.controller';

type AccountLoginProps = {};

const AccountLogin: FC<AccountLoginProps> = () => {
  const { closeLoginModal, showLoginModal } = useGlobalOperate();
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;
  const [loginLoading, setLoginLoading] = useState(false);
  useEffect(() => {
    resetFields();
    return () => {
      resetFields();
    };
  }, []);
  const onAccountLogin = async () => {
    setLoginLoading(true);
    const { account, pwd } = await validateFields(['account', 'pwd']);
    await userLogin(account, pwd);
    setLoginLoading(false);
  };

  const onForgotPassword = () => {
    showLoginModal(0);
  };
  return (
    <StyledLoginForm onFinish={onAccountLogin} form={form}>
      <Form.Item name="account" validateTrigger={[]} rules={[{ required: true, message: '账号不能为空' }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <PasswordInputFormItem
        suffix={
          <Button size="small" type="link" onClick={onForgotPassword}>
            忘记密码?
          </Button>
        }
      />
      <Form.Item>
        <Button htmlType="submit" type="primary" block loading={loginLoading}>
          登陆
        </Button>
      </Form.Item>
    </StyledLoginForm>
  );
};

export default AccountLogin;
