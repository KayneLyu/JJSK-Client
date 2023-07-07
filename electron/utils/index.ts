import { existsSync, mkdirSync, createWriteStream, unlinkSync } from 'fs';
import { dirname } from 'path';
import throttle from 'lodash/throttle';
import axios from 'axios';
import { Readable } from 'stream';

export const mkdirp = (path: string): void => {
  if (existsSync(path)) {
    return;
  }
  const parentDir = dirname(path);
  if (!existsSync(parentDir)) {
    mkdirp(parentDir);
  }
  mkdirSync(path);
};

type downloadFileToLocalOption = {
  downUrl: string;
  localPath: string;
  onProgress?: (progress: number) => void;
  onError?: (err: Error) => void;
  onSuccess?: (progress: number) => void;
};

export interface DownloadFileToLocal {
  download: () => Promise<void>;
  cancel: () => void;
}

/**
 * 下载文件到本地
 * @description 该函数仅可在Node环境下使用
 * */
export const downloadFileToLocal = ({ downUrl, localPath, onError, onProgress, onSuccess }: downloadFileToLocalOption): DownloadFileToLocal => {
  const path = dirname(localPath);
  if (!existsSync(path)) {
    mkdirp(path);
  }
  const writer = createWriteStream(localPath);
  onProgress?.(0);
  const downloadProgress = throttle(progress => {
    /* 使用节流  进度发送太频繁 会导致页面卡顿 */
    onProgress?.(progress);
  }, 1000);
  const Source = axios.CancelToken.source();
  let error: Error | null = null;
  const download = async () => {
    /* 下载 */
    try {
      const { data, headers } = await axios.get<Readable>(encodeURI(decodeURI(downUrl)), {
        responseType: 'stream',
        cancelToken: Source.token,
      });
      data.pipe(writer);
      let loadedBytes = 0;
      const total = parseFloat(headers['content-length'] || '0');

      data.on('data', chunk => {
        loadedBytes += chunk.length;
        const progress = Math.floor((loadedBytes / total) * 100);
        downloadProgress(progress);
      });
      data.on('error', err => {
        onDownloadError(err);
      });
      writer.on('close', () => {
        if (!error) {
          downloadProgress.cancel();
          const progress = Math.floor((loadedBytes / total) * 100);
          onSuccess?.(progress);
        }
      });
      writer.on('error', err => {
        onDownloadError(err);
      });
    } catch (err: any) {
      onDownloadError(err);
    }
  };
  const cancel = () => {
    /* 取消下载 */
    Source?.cancel();
    writer.close();
    writer.destroy();
  };
  const onDownloadError = (err: Error) => {
    error = err;
    onError?.(err);
    writer.close();
    writer.destroy();
    unlinkSync(localPath);
  };
  return { cancel, download };
};

export const promiseTimeout = <T>(promise: Promise<T>, ms: number) => {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(`Timed out in ${ms}ms.`));
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race<T>([promise, timeout]);
};


export const SendMessage = <O, R>(Data: WorkerMessage<O, R>) => {
  process.send?.(Data);
};

export const BuildElectronModule = (module: { [key: string]: Function }) => {
  process.on('message', async (Data: WorkerMessage<unknown, unknown>) => {
    try {
      const MethodName = Data.Method.replace(`worker:`, '');
      Data.Result = await module[MethodName](Data.Options);
    } catch (err) {
      Data.Error = (err as Error).message;
    }
    return SendMessage(Data);
  });
};
