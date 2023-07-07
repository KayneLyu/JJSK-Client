import { ipcRenderer } from 'electron';
type IPCRendererCallbackFunc<T> = (error: string | undefined, result?: T) => void;

/**
 * 构建渲染层函数调用
 * @param name 函数名
 * @param fx 原函数
 * */
const buildElectronRenderFunction = <O, R>(name: string, fx: IPCRendererCallbackFunc<R>) => {
  return (Options?: O) => {
    const Method = `worker:${name}`;
    const wm: WorkerMessage<O, R> = {
      Method,
      Options,
    };
    console.log('send =>', wm);
    ipcRenderer.send('worker-message', wm);
    ipcRenderer.removeAllListeners(Method);
    ipcRenderer.on(Method, (e, data: WorkerMessage<O, R>) => {
      console.log('worker-message =>', data);
      fx(data.Error, data.Result);
    });
  };
};

export default buildElectronRenderFunction;
