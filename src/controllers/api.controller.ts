import axios, { AxiosResponse } from 'axios';
import { getLocalData, setLocalData } from '@/stores/local';

const buildUrl = (path: string) => {
  return `${import.meta.env.VITE_API_URL}${path}`;
};
const buildOSSUrl = (path: string) => {
  return `${import.meta.env.VITE_OSS_URL}/${path}`;
};
type APICode = 200 | 500 | 401 | 403;
interface ResultData<T> {
  code: APICode;
  msg: string;
  data: T;
}

interface PageResultData<T> {
  code: 200 | 500 | 401 | 403;
  msg: string;
  total: number;
  rows: T[];
}

const buildResult = async <T>(result: Promise<ResultData<T>>): Promise<T> => {
  const { code, msg, data } = await result;
  if (code === 200) {
    return data;
  }
  if (code === 401 || code === 403) {
    removeToken();
  }
  throw new ApiError(code, msg);
};

const buildPageResult = async <T>(
  result: Promise<PageResultData<T>>,
): Promise<{
  rows: T[];
  total: number;
}> => {
  const { code, msg, rows, total } = await result;
  if (code === 200) {
    return { rows, total };
  }
  if (code === 401 || code === 403) {
    removeToken();
  }
  throw new ApiError(code, msg);
};

export class ApiError extends Error {
  public code: APICode;
  constructor(code: APICode, msg: string) {
    super(msg);
    this.code = code;
  }
}

export const setToken = (token: string) => {
  setLocalData('token', token);
};

/**
 * 删除token
 * */
export const removeToken = () => {
  setLocalData('token', null);
};

const buildHeader = () => {
  const token = getLocalData<string | null>('token', null);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const getResponse = async <T>(Response: Promise<AxiosResponse<T>>): Promise<T> => {
  const { headers, data } = await Response;
  const token = headers['Authorization'];
  if (token) {
    setToken(token);
  }
  if (data) {
    return data;
  }
  throw new Error('Unable to parse the data type');
};

interface NoDataResult {}

/**
 * 1:yes
 * 0:no
 * */
type YesNo = 0 | 1;
/**
 * 0:普通用户
 * 1:开通过vip现在已过期
 * 2:vip用户
 * */
type UserType = 0 | 1 | 2;
/**
 * 0:没有活动
 * 1:活动未开始
 * 2:活动进行中
 * */
type ActivityStatus = 0 | 1 | 2;
/**
 * 0:支付宝
 * 1:微信;
 * */
export type OrderType = 0 | 1;
/**
 * 0:不可用
 * 1:可用
 * 100:最新版
 * */
type AppStatus = 0 | 1 | 100;

interface GetCaptchaResult {
  img: string;
  uuid: string;
}

/**
 * 触发邮件滑块
 * */
export const getCaptcha = () => {
  return buildResult<GetCaptchaResult>(getResponse(axios.get(buildUrl('captcha'), { headers: buildHeader() })));
};

interface SendEmailCodeResult {
  uuid: string;
}

/**
 * 发送注册邮件
 * */
export const sendEmailCode = (params: { username: string; code: string; uuid: string }) => {
  return buildResult<SendEmailCodeResult>(getResponse(axios.post(buildUrl('register/email'), params, { headers: buildHeader() })));
};

interface RegisterResult {
  expires: number;
  token: string;
}

/**
 * 邮箱注册
 * */
export const register = (params: { username: string; code: string; password: string; uuid: string }) => {
  return buildResult<RegisterResult>(getResponse(axios.post(buildUrl('register'), params, { headers: buildHeader() })));
};

interface LoginResult {
  expires: number;
  token: string;
}

/**
 * 邮箱登陆
 * */
export const login = (params: { username: string; password: string }) => {
  return buildResult<LoginResult>(getResponse(axios.post(buildUrl('login'), params, { headers: buildHeader() })));
};

/**
 * 退出登陆
 * */
export const logout = () => {
  return buildResult<NoDataResult>(getResponse(axios.delete(buildUrl('logout'), { headers: buildHeader() })));
};

interface ForgetPwdByEmailResult {
  uuid: string;
}

/**
 * 发送忘记密码邮件
 * */
export const forgetPwdByEmail = (params: { username: string; code: string; uuid: string }) => {
  return buildResult<ForgetPwdByEmailResult>(getResponse(axios.post(buildUrl('forgetpwd/email'), params, { headers: buildHeader() })));
};

/**
 * 发送忘记密码邮件
 * */
export const forgetPwd = (params: { username: string; code: string; password: string; uuid: string }) => {
  return buildResult<NoDataResult>(getResponse(axios.post(buildUrl('forgetpwd'), params, {})));
};

interface PersonalResult {
  nickName: string;
  expirTime: string;
  userType: UserType;
}

/**
 * 用户基础信息
 * */
export const getPersonal = () => {
  return buildResult<PersonalResult>(getResponse(axios.get(buildUrl('personal/basic'), { headers: buildHeader() })));
};

export interface PersonalDetailResult {
  /* 用户id */
  id: number;
  /* vip过期时间 */
  expirTime: string;
  /* 注册时间 */
  registerTime: string;
  /* 用户昵称 */
  nickName: string;
  /* 用户类型 */
  userType: UserType;
  /* 邮箱 */
  email: string;
  /* 是否设置密码 */
  spwd: YesNo;
  /* 是否绑定邮箱 */
  smail: YesNo;
  /* 是否绑定微信 */
  swx: YesNo;
}

export const getPersonalDetail = () => {
  return buildResult<PersonalDetailResult>(getResponse(axios.get(buildUrl('personal/detail'), { headers: buildHeader() })));
};

/**
 * 修改密码
 * */
export const updatePersonalPwd = (params: { password: string; newpwd: string }) => {
  return buildResult<NoDataResult>(getResponse(axios.post(buildUrl('personal/modify/pwd'), params, { headers: buildHeader() })));
};

interface GoodListResult {
  /* 商品id */
  goodsId: number;
  /* 时长 单位天 */
  duration: number;
  /* 商品名称 */
  goodsName: string;
  /* 商品价格 */
  goodsPrice: string;
  /* 折扣价格 */
  discountPrice: string;
  /* 是否推荐 枚举YesNo */
  suggest: YesNo;
  /* 活动状态 */
  activity: ActivityStatus;
  /* 活动标题 */
  activitySubject?: string;
  /* 活动期间价格 */
  activityPrice: string;
  /* 活动开始时间 */
  activityStart: string;
  /* 活动结束时间 */
  activityEnd: string;
  /* 距离活动结束时间(单位秒) */
  distanceEnd: number;
}

/**
 * 商品列表
 * */
export const getGoodList = () => {
  return buildPageResult<GoodListResult>(getResponse(axios.get(buildUrl('goods/list'), {})));
};

interface PayOrderResult {
  qrcode: string;
}

/**
 * 支付订单
 * */
export const payOrder = (params: { goodsId: number; orderType: OrderType }) => {
  return buildResult<PayOrderResult>(getResponse(axios.post(buildUrl('personal/order'), params, { headers: buildHeader() })));
};

interface AppDownloadResult {
  download: string;
}

/**
 * App下载
 * */
export const appDownload = () => {
  return buildResult<AppDownloadResult>(getResponse(axios.get(buildUrl('app/download'))));
};

interface AppVersionResult {
  curr: string; //当前版本
  latest: string; //最新版本号
  latestAddr: string; //最新版下载地址
  remark: string; //更新日志
  status: AppStatus; //状态 枚举 AppStatus
}

/**
 * App更新
 * */
export const appVersion = () => {
  return buildResult<AppVersionResult>(getResponse(axios.get(buildUrl('app/version'))));
};

interface GameCheckResult {
  ver: string;
}

/**
 * 游戏详情版本检测
 * */
export const gameCheck = (params: { gameId: string }) => {
  return buildResult<GameCheckResult>(getResponse(axios.get(buildUrl(`game/check/${params.gameId}`))));
};

interface GameDetailResult {
  ver: string;
  data: string;
}

/**
 * 游戏详情版本检测
 * */
export const gameDetail = (params: { gameId: string }) => {
  return buildResult<GameDetailResult>(getResponse(axios.get(buildUrl(`game/detail/${params.gameId}`))));
};

interface VIPCheckResult {
  status: 1;
}

/**
 * VIP验证
 * */
export const vipCheck = () => {
  return buildResult<VIPCheckResult>(getResponse(axios.post(buildUrl('vip/check'), {}, { headers: buildHeader() })));
};

interface GameListResult {
  url: string;
  ver: string;
}

/**
 * 游戏列表
 * */
export const gameList = () => {
  return buildResult<GameListResult>(getResponse(axios.get(buildUrl(`game/list`))));
};

interface PubRecommendResult {
  thumbnail: string;
  gameId: string;
}

/**
 * 游戏推荐列表
 * */
export const pubRecommend = () => {
  return buildPageResult<PubRecommendResult>(getResponse(axios.post(buildUrl(`pub/recommend`))));
};

export interface PubListResult {
  id: number;
  name: string;
  zhCnName: string;
  thumbnail: string;
  status: number;
  cheatCount: number;
  updateTimestamp: number;
  gameIds: number[];
  platforms: GamePlatform[];
  sort: number;
  publicitySort: number;
  appSort: number;
  keyWorld: string;
}

/**
 * 游戏列表
 * */
export const pubList = (params: { kw?: string; pageNum: number }) => {
  return buildPageResult<PubListResult>(getResponse(axios.post(buildUrl(`pub/list`), params, { headers: { 'Content-Type': 'multipart/form-data' } })));
};

interface PubDetailComment {
  comment: string;
  avatar: string;
}
interface PubDetailCategory {
  category: string;
  children: string[];
}
interface PubDetailResult {
  gameDetail: {
    name: string;
    zhCnName: string;
    detailLongImg: string;
    shelves: string;
    platformId: string; //平台
    cheatCount: number; //功能数量
    lastSupportedVersion: number; //最后支持版本
    updateTimestamp: number; //最后更新时间
    detailBuffImg: string;
  };
  categoryList: PubDetailCategory[]; //功能
  commentList: PubDetailComment[]; //评论
}
export const pubDetail = (params: { gameId: string }) => {
  return buildResult<PubDetailResult>(getResponse(axios.post(buildUrl(`pub/detail/${params.gameId}`))));
};

interface GameList {
  titles: Record<number, Game>;
}
export const getGameList = () => {
  return getResponse<GameList>(axios.get(buildOSSUrl('redbuff/gamelist.json')));
};
