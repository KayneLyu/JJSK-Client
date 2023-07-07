import { Form } from 'antd';
import { useEffect, useRef, useState } from 'react';

export const useRegister = () => {
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    resetFields();
    return () => {
      resetFields();
    };
  }, []);

  return {
    loginLoading,
    setLoginLoading,
    validateFields,
    form,
  };
};
