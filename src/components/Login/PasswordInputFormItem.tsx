import { Form, Input } from 'antd';
import React, { FC, ReactNode } from 'react';

interface PasswordInputFormItemProps {
  label?: string;
  suffix?: ReactNode;
  placeholder?: string;
}
const PasswordInputFormItem: FC<PasswordInputFormItemProps> = ({ label, suffix, placeholder }) => {
  return (
    <Form.Item label={label} name="pwd" validateTrigger={[]} rules={[{ required: true, message: '密码不能为空' }]}>
      <Input placeholder={placeholder || '请输入密码'} type="password" suffix={suffix} />
    </Form.Item>
  );
};

export default PasswordInputFormItem;
