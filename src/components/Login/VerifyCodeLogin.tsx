import { Button, Form, message } from 'antd';
import React, { FC } from 'react';
import AccountInputFormItem from './AccountInputFormItem';
import { StyledLoginForm } from './styled';
import VerifyCodeInputFormItem from './VerifyCodeInputFormItem';
import { useRegister } from './hooks';

type VerifyCodeLoginProps = {};
const VerifyCodeLogin: FC<VerifyCodeLoginProps> = ({}) => {
  const { loginLoading, setLoginLoading, validateFields, form } = useRegister();
  const onVerifyCodeLogin = async () => {
    setLoginLoading(true);
    const { phone, codeSessionId, code } = await validateFields(['phone', 'codeSessionId', 'code']);
    console.log(phone, codeSessionId, code);
    try {
    } catch (err) {
      setLoginLoading(false);
      message.warning((err as Error).message);
    }
  };
  return (
    <StyledLoginForm onFinish={onVerifyCodeLogin} form={form}>
      <AccountInputFormItem />
      <VerifyCodeInputFormItem form={form} />
      <Form.Item>
        <Button htmlType="submit" type="primary" block loading={loginLoading}>
          登录
        </Button>
      </Form.Item>
    </StyledLoginForm>
  );
};

export default VerifyCodeLogin;
