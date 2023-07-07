import buildElectronRenderFunction from '@/utils/ElectronModule';
import { globalOperate } from '@/stores';
import { message } from 'antd';

const getMyGames = (error?: string, result?: number[]) => {
  const { setUserGames } = globalOperate();
  if (result) {
    setUserGames(result);
  }
};
const getGameDetails = (error?: string, result?: GetGameDetailsResult) => {
  const { setUserGameDetail } = globalOperate();
  if (result) {
    setUserGameDetail(result);
  }
};
const getGameProcessInfo = (error?: string, result?: GetGameProcessInfoResult) => {
  const { setUserGameProcessInfo } = globalOperate();
  if (result) {
    setUserGameProcessInfo(result);
  }
};

const getProcessList = (error?: string, result?: GetGameProcessInfoResult[]) => {
  const { setUserGameProcessList } = globalOperate();
  if (result) {
    setUserGameProcessList(result);
  }
};
const StartBuff = (error?: string, result?: SendCommandResult) => {
  if (result) {
    if (result.success) message.success('BUFF加持成功');
    else {
      message.warning('BUFF加持失败');
    }
  }
};
const stopBuffer = () => {};

const sendCommand = () => {};

const ElectronRenderModule = {
  getMyGames: buildElectronRenderFunction('getMyGames', getMyGames),
  getGameDetails: buildElectronRenderFunction('getGameDetails', getGameDetails),
  getGameProcessInfo: buildElectronRenderFunction('getGameProcessInfo', getGameProcessInfo),
  getProcessList: buildElectronRenderFunction('getProcessList', getProcessList),
  StartBuff: buildElectronRenderFunction('StartBuff', StartBuff),
  stopBuffer: buildElectronRenderFunction('stopBuffer', stopBuffer),
  sendCommand: buildElectronRenderFunction('sendCommand', sendCommand),
};

export default ElectronRenderModule;
