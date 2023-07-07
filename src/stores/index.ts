import { State, useHookstate, hookstate, none } from '@hookstate/core';
import { useMemo } from 'react';
import { PersonalDetailResult } from '@/controllers/api.controller';

interface GlobalState {
  loginModalVisible: boolean;
  /* 0:忘记密码 1:登录 2:注册 3:修改密码 4:忘记密码无法返回登录 5:忘记密码成功 */
  loginModalType: 0 | 1 | 2 | 3 | 4 | 5;
  user?: PersonalDetailResult;
  userGames?: number[];
  userGameProcessInfo?: GetGameProcessInfoResult;
  userGameDetail?: GetGameDetailsResult;
  userGameProcessList?: GetGameProcessInfoResult[];
}
const defaultGlobalState: GlobalState = {
  loginModalVisible: false,
  loginModalType: 1,
};

/**
 * 全局器数据状态
 * */
const globalStore = hookstate<GlobalState>(defaultGlobalState);

/**
 * 包装数据
 * */
const wrapState = (s: State<GlobalState>) => {
  const loginModalVisible = useMemo(() => {
    return s.loginModalVisible.value;
  }, [s.loginModalVisible.value]);
  const loginModalType = useMemo(() => {
    return s.loginModalType.value;
  }, [s.loginModalType.value]);
  const userInfo = useMemo(() => {
    return s.user.value;
  }, [s.user.value]);
  const userGames = useMemo(() => {
    return s.userGames.value;
  }, [s.userGames.value]);
  const userGameProcessInfo = useMemo(() => {
    return s.userGameProcessInfo.value;
  }, [s.userGameProcessInfo]);
  const userGameDetail = useMemo(() => {
    return s.userGameDetail.value;
  }, [s.userGameDetail]);
  const useGameProcessList = useMemo(() => {
    return s.userGameProcessList.value;
  }, [s.userGameProcessList.value]);
  return { loginModalVisible, loginModalType, userInfo, userGames, userGameProcessInfo, userGameDetail, useGameProcessList };
};

/**
 * 包装操作
 * */
const wrapOperate = (s: State<GlobalState>) => {
  const showLoginModal = (mode: 0 | 1 | 2 | 3 | 4 | 5) => {
    s.loginModalVisible.set(true);
    s.loginModalType.set(mode);
  };
  const closeLoginModal = () => {
    s.loginModalVisible.set(false);
  };
  const setUserInfo = (user: PersonalDetailResult) => {
    s.user.set(user);
  };
  const clearUserInfo = () => {
    s.user.set(none);
  };
  const setUserGames = (games: number[]) => {
    s.userGames.set(games);
  };
  const setUserGameProcessInfo = (info: GetGameProcessInfoResult) => {
    s.userGameProcessInfo.set(info);
  };
  const setUserGameDetail = (info: GetGameDetailsResult) => {
    s.userGameDetail.set(info);
  };
  const setUserGameProcessList = (list: GetGameProcessInfoResult[]) => {
    s.userGameProcessList.set(list);
  };
  return { showLoginModal, closeLoginModal, setUserInfo, clearUserInfo, setUserGames, setUserGameProcessInfo, setUserGameDetail, setUserGameProcessList };
};

export const useGlobalState = () => wrapState(useHookstate(globalStore));

export const useGlobalOperate = () => wrapOperate(useHookstate(globalStore));

export const globalOperate = () => wrapOperate(globalStore);

export const globalState = () => wrapState(globalStore);
