import { Button, Form, Input, message } from 'antd';
import React, { FC, useState } from 'react';
import { userPatchPwd } from '@/controllers/user.controller';
import { StyledLoginForm, StyledLoginSection } from './styled';
import PasswordAgainFormItem from './PasswordAgainFormItem';
import { useGlobalOperate } from '@/stores';
import { PASSWORD_PATTERN } from '@/utils/constants';

type UserChangePasswordProps = {};

const UserChangePassword: FC<UserChangePasswordProps> = () => {
  const { showLoginModal } = useGlobalOperate();
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [loading, setLoading] = useState(false);
  const onChangePWD = async () => {
    setLoading(true);
    const { newPassword, oldPassword, pwdAg } = await validateFields(['newPassword', 'oldPassword', 'pwdAg']);
    if (newPassword === pwdAg) {
      await userPatchPwd({ password: oldPassword, newpwd: newPassword });
      setLoading(false);
    }
  };
  const onForgotPassword = () => {
    showLoginModal(4);
  };
  return (
    <StyledLoginSection>
      <header>修改密码</header>
      <StyledLoginForm form={form} layout="vertical" onFinish={onChangePWD}>
        <Form.Item
          label={'旧密码'}
          name="oldPassword"
          validateTrigger={[]}
          rules={[
            { required: true, message: '旧密码不能为空' },
            { pattern: PASSWORD_PATTERN, message: '请输入6-12位数字、字母' },
          ]}>
          <Input
            placeholder="请输入旧密码"
            type="password"
            suffix={
              <Button size="small" type="link" onClick={onForgotPassword}>
                忘记密码?
              </Button>
            }
          />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          validateTrigger={[]}
          rules={[
            { required: true, message: '新密码不能为空' },
            { pattern: PASSWORD_PATTERN, message: '请输入6-12位数字、字母' },
          ]}>
          <Input placeholder="请输入新密码" type="password" />
        </Form.Item>
        <PasswordAgainFormItem field="newPassword" />
        <Form.Item>
          <Button htmlType="submit" type="primary" block loading={loading}>
            确认修改
          </Button>
        </Form.Item>
      </StyledLoginForm>
    </StyledLoginSection>
  );
};

export default UserChangePassword;
