import { Button, Form, FormInstance, Input } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import VerifyCodeModal from '@/components/Login/VerifyCodeModal';

interface VerifyCodeInputFormItemProps {
  form: FormInstance;
}
const VerifyCodeInputFormItem: FC<VerifyCodeInputFormItemProps> = ({ form }) => {
  const { validateFields, getFieldValue, setFieldValue } = form;
  const [visible, setVisible] = useState(false);
  const onGetVerifyCode = async () => {
    await validateFields(['account']);
    setVisible(true);
  };
  const onCancelGetVerifyCode = () => {
    setVisible(false);
  };
  const userName = useMemo(() => {
    if (visible) {
      return getFieldValue('account');
    }
  }, [visible]);
  const onSendEmailVerifyCode = (uuid: string) => {
    setFieldValue('codeSessionId', uuid);
    setVisible(false);
  };
  return (
    <>
      <Form.Item name="code" validateTrigger={[]} rules={[{ required: true, message: '请输入验证码' }]}>
        <Input placeholder="请输入验证码" suffix={<Button onClick={onGetVerifyCode}>获取验证码</Button>} />
      </Form.Item>
      <VerifyCodeModal userName={userName} visible={visible} onCancel={onCancelGetVerifyCode} onOk={onSendEmailVerifyCode} />
    </>
  );
};

export default VerifyCodeInputFormItem;
