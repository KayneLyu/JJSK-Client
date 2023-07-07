import { Button, Form, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { getCaptcha } from '@/controllers/api.controller';
import { userSendEmailVerifyCode } from '@/controllers/user.controller';
import { StyledLoginForm, StyledVerifyCodeModal } from '@/components/Login/styled';

interface VerifyCodeModalProps {
  visible: boolean;
  onCancel: () => void;
  userName?: string;
  onOk: (uuid: string) => void;
}
const VerifyCodeModal: FC<VerifyCodeModalProps> = ({ visible, onCancel, userName, onOk }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { validateFields } = form;
  const { data, run } = useRequest(getCaptcha, { manual: true });
  useEffect(() => {
    if (visible) {
      run();
    }
  }, [visible]);
  const onSendEmailVerifyCode = async () => {
    if (data && userName) {
      setLoading(true);
      const { code } = await validateFields(['code']);
      const result = await userSendEmailVerifyCode({ username: userName, code, uuid: data.uuid, type: 'register' });
      if (result) onOk(result.uuid);
      setLoading(false);
    }
  };
  return (
    <StyledVerifyCodeModal open={visible} centered title="获取邮箱验证码" destroyOnClose onCancel={onCancel} footer={null}>
      <StyledLoginForm form={form} onFinish={onSendEmailVerifyCode}>
        <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
          <Input placeholder="请输入验证码" suffix={data?.img && <img src={`data:image/png;base64,${data.img}`} style={{ height: 30 }} onClick={run} />} />
        </Form.Item>
        <Button htmlType="submit" type="primary" block loading={loading}>
          发送邮箱验证码
        </Button>
      </StyledLoginForm>
    </StyledVerifyCodeModal>
  );
};
export default VerifyCodeModal;
