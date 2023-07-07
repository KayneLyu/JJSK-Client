import { BuildElectronModule, promiseTimeout } from '../utils';
import { createConnection, Socket, createServer, connect } from 'net';
import { resolve } from 'node:path';
import { exec } from 'node:child_process';
import { execSync } from 'child_process';

const PIPE_OUT_PATH = `\\\\.\\pipe\\redbuff_out`;

const ReBuffExePath = resolve(process.env.DIST_ELECTRON, '../dependencies');

let client: Socket;
let PIPE_IN_PATH: string;

let timer: NodeJS.Timeout;
const reconnect = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('reconnect');
    connectIPC();
  }, 1000);
};
const MessageList: { [key: string]: <T>(res: T) => void } = {};
const connectIPC = () => {
  client = createConnection(PIPE_IN_PATH, () => {
    console.log('connected');
  });
  client.on('error', err => {
    // @ts-ignore
    if (err.syscall === 'connect') {
      reconnect();
    } else {
      console.error(err);
    }
  });
  client.on('close', () => {
    console.log('close');
    reconnect();
  });
  client.on('data', data => {});
  client.on('end', () => {
    console.log('end');
  });
};

const init = () => {
  const server = createServer(stream => {
    stream.on('data', function (data) {
      try {
        const { method, params } = JSON.parse(data.toString());
        if (MessageList[method]) {
          MessageList[method](params);
        }
      } catch (e) {
        PIPE_IN_PATH = data.toString();
        connectIPC();
      }
    });
    stream.on('end', function () {
      server.close();
    });
  });
  server.listen(PIPE_OUT_PATH);
  exec(
    `start redbuff.exe`,
    {
      cwd: ReBuffExePath,
    },
    (error, stdout, stderr) => {
      console.log(error, stdout, stderr);
    },
  );
};
init();
const sendMsg = <T, P>({ command, timeout = 25000 }: { command: { method: string; params: P }; timeout?: number }) => {
  const p = new Promise<T>(resolve => {
    client?.write(Buffer.from(JSON.stringify(command)));
    (MessageList[command.method] as (res: T) => void) = data => resolve(data);
  });
  return promiseTimeout(p, timeout);
};

const worker = {
  getMyGames: () => {
    const command = { method: 'getMyGames', params: null };
    return sendMsg<number[], null>({ command });
  },
  getGameDetails: (params: { gameId: number }) => {
    const command = { method: 'getGameDetails', params: { gameid: params.gameId } };
    return sendMsg<GetGameDetailsResult, { gameid: number }>({ command });
  },
  getGameProcessInfo: (params: { gameId: number }) => {
    const command = { method: 'getGameProcessInfo', params: { gameid: params.gameId } };
    return sendMsg<GetGameProcessInfoResult, { gameid: number }>({ command });
  },
  getProcessList: () => {
    const command = { method: 'getProcessList', params: null };
    return sendMsg<GetGameProcessInfoResult[], null>({ command });
  },
  StartBuff: (params: { gameId: number; processId: number }) => {
    const command = { method: 'StartBuff', params: { gameid: params.gameId, processid: params.processId } };
    return sendMsg<SendCommandResult, StartBuffParams>({ command });
  },
  stopBuffer: () => {
    const command = { method: 'stopBuffer', params: null };
    return sendMsg<SendCommandResult, null>({ command });
  },
  sendCommand: (params: SendCommandParams) => {
    const command = { method: 'sendCommand', params };
    return sendMsg<SendCommandResult, SendCommandParams>({ command });
  },
};

BuildElectronModule(worker);
