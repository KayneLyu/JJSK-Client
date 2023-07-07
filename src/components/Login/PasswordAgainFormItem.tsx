import { Form, Input } from 'antd';
import React, { FC } from 'react';
import { PASSWORD_PATTERN } from '@/utils/constants';

type PasswordAgainFormItemProps = {
  field: string;
};
const PasswordAgainFormItem: FC<PasswordAgainFormItemProps> = ({ field }) => {
  return (
    <Form.Item
      name="pwdAg"
      validateTrigger={[]}
      rules={[
        { required: true, message: '请再次输入新密码' },
        { pattern: PASSWORD_PATTERN, message: '请输入6-12位数字、字母' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(field) === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次密码输入不一致'));
          },
        }),
      ]}>
      <Input placeholder="请输入新密码¬" type="password" />
    </Form.Item>
  );
};

export default PasswordAgainFormItem;
