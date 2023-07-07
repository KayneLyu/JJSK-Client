import {
  ApiError,
  forgetPwd,
  forgetPwdByEmail,
  getPersonalDetail,
  login,
  logout,
  OrderType,
  payOrder,
  register,
  removeToken,
  sendEmailCode,
  setToken,
  updatePersonalPwd,
} from '@/controllers/api.controller';
import { globalOperate } from '@/stores';
import { message } from 'antd';

/**
 * 用户退出登陆
 * */
export const userLogout = async (): Promise<boolean> => {
  const { clearUserInfo } = globalOperate();
  try {
    await logout();
    removeToken();
    clearUserInfo();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const resetAccountPwd = async (params: { username: string; code: string; password: string; uuid: string }) => {
  const { showLoginModal } = globalOperate();
  try {
    const res = await forgetPwd(params);
    userLogout();
    showLoginModal(5);
  } catch (err) {
    console.error(err);
    message.warning((err as Error).message);
  }
};

export const userLogin = async (account: string, password: string) => {
  const { closeLoginModal } = globalOperate();
  try {
    const { token } = await login({ username: account, password });
    setToken(token);
    getUserInfo();
    closeLoginModal();
  } catch (err) {
    console.error(err);
    message.warning((err as Error).message);
  }
};

export const getUserInfo = async () => {
  const { setUserInfo } = globalOperate();
  try {
    const user = await getPersonalDetail();
    setUserInfo(user);
  } catch (e) {}
};

export const userRegister = async (params: { username: string; code: string; password: string; uuid: string }) => {
  const { closeLoginModal } = globalOperate();
  try {
    const res = await register(params);
    setToken(res.token);
    getUserInfo();
    closeLoginModal();
  } catch (err) {
    console.error(err);
    message.warning((err as Error).message);
  }
};

export const userSendEmailVerifyCode = async ({ type, ...params }: { username: string; code: string; uuid: string; type: 'forget' | 'register' }) => {
  try {
    const res = await (type === 'register' ? sendEmailCode : forgetPwdByEmail)(params);
    message.success('发送验证码成功！');
    return res;
  } catch (err) {
    console.error(err);
    message.warning((err as Error).message);
  }
};

export const userPayOrder = async (params: { goodsId: number; orderType: OrderType }) => {
  const { showLoginModal } = globalOperate();
  try {
    return await payOrder(params);
  } catch (err) {
    if ((err as ApiError).code === 401) {
      showLoginModal(1);
    }
  }
};

export const userPatchPwd = async (params: { password: string; newpwd: string }) => {
  const { showLoginModal } = globalOperate();
  try {
    const res = await updatePersonalPwd(params);
    userLogout();
    showLoginModal(1);
  } catch (err) {
    console.error(err);
    message.warning((err as Error).message);
  }
};
