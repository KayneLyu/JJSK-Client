import { Form, Input } from 'antd';
import React, { FC } from 'react';

type PhoneInputFormItemProps = {};

const AccountInputFormItem: FC<PhoneInputFormItemProps> = ({}) => {
  return (
    <Form.Item name="account" validateTrigger={[]} rules={[{ required: true, message: '账号不能为空' }]}>
      <Input placeholder={'请输入邮箱'} />
    </Form.Item>
  );
};

export default AccountInputFormItem;
