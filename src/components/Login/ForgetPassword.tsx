import { LeftOutlined } from '@ant-design/icons';
import { Button, Form, message } from 'antd';
import React, { FC } from 'react';
import { resetAccountPwd } from '@/controllers/user.controller';
import { userLogout } from '@/controllers/user.controller';
import AccountInputFormItem from './AccountInputFormItem';
import { StyledLoginForm, StyledLoginSection } from './styled';
import VerifyCodeInputFormItem from './VerifyCodeInputFormItem';
import PasswordInputFormItem from './PasswordInputFormItem';
import PasswordAgainFormItem from './PasswordAgainFormItem';
import { useGlobalOperate, useGlobalState } from '@/stores';
import { useRegister } from '@/components/Login/hooks';

type ForgetPasswordProps = {
  onReturnLogin: () => void;
};
const ForgetPassword: FC<ForgetPasswordProps> = ({ onReturnLogin }) => {
  const { loginModalType } = useGlobalState();
  const { loginLoading, setLoginLoading, validateFields, form } = useRegister();

  const onResetAccountPWD = async () => {
    setLoginLoading(true);
    const { account, code, pwd, codeSessionId, pwdAg } = await validateFields(['account', 'code', 'pwd', 'codeSessionId', 'pwdAg']);
    if (pwd === pwdAg) {
      await resetAccountPwd({
        username: account,
        code,
        password: pwd,
        uuid: codeSessionId,
      });
      setLoginLoading(false);
    }
  };
  return (
    <StyledLoginSection>
      <header>
        {loginModalType === 0 && (
          <Button type="link" onClick={onReturnLogin}>
            <LeftOutlined />
            返回登录
          </Button>
        )}
        忘记密码
      </header>
      <main>
        <StyledLoginForm layout="vertical" onFinish={onResetAccountPWD} form={form}>
          <AccountInputFormItem />
          <VerifyCodeInputFormItem form={form} />
          <PasswordInputFormItem label="新密码" />
          <PasswordAgainFormItem field="pwd" />
          <Form.Item>
            <Button htmlType="submit" type="primary" block loading={loginLoading}>
              找回密码
            </Button>
          </Form.Item>
        </StyledLoginForm>
      </main>
    </StyledLoginSection>
  );
};

export default ForgetPassword;
