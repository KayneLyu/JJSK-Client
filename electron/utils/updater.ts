import { spawn } from 'child_process';
import { app } from 'electron';
import { arch, homedir } from 'os';
import { existsSync } from 'fs';
import { resolve } from 'path';
import axios from 'axios';
import { gt } from 'semver';
import { downloadFileToLocal, mkdirp } from './index';

const updaterDir = resolve(homedir(), 'AppData/Roaming/ReBuff', 'updater');
let updaterPath: string;
export const initUpdater = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_OSS_URL}/client/update.json`);
  if (gt(data.version, app.getVersion())) {
    /* 最新版本大于当前版本 */
    const versionInfo = await axios.get(`${import.meta.env.VITE_OSS_URL}/client/${data.version}/update.json`);
    const { x86, x64, version } = versionInfo.data;
    const downUrl = `${import.meta.env.VITE_OSS_URL}/${arch() === 'ia32' ? x86 : x64}`;
    if (!existsSync(updaterDir)) {
      mkdirp(updaterDir);
    }
    const path = resolve(updaterDir, `updater-${version}.exe`);
    if (existsSync(path)) {
      updaterPath = path;
    } else {
      await downloadFileToLocal({
        downUrl,
        localPath: path,
        onSuccess: () => {
          updaterPath = path;
        },
        onError: err => {
          console.error(err);
        },
      }).download();
    }
  }
};

export const installUpdater = () => {
  if (updaterPath) {
    spawn(updaterPath, ['/S'], {
      detached: true,
      stdio: 'ignore',
    });
  }
};
