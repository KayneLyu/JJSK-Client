import { prompt } from 'inquirer';
import { execSync } from 'child_process';
import * as OSS from 'ali-oss';
import { resolve } from 'node:path';

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI5t682ARhxgEDdLkeKj2i',
  accessKeySecret: 'jA3Xa0QG5rW1RIcRa8Wu6soT0wJNBt',
  bucket: 'xxbuff-test',
});

type BuildType = 'pro' | 'fat';

const ReleaseType = {
  核心版本: 'major',
  主要版本: 'minor',
  次要版本: 'patch',
};
const BUILD_TYPE = {
  生产: 'pro',
  测试: 'fat',
};
let buildType: null | string = null;
let releaseType: null | string = null;
process.argv.forEach(d => {
  if (d.includes('--build-type')) {
    buildType = d.split('=')[1];
  }
  if (d.includes('--release-type')) {
    releaseType = d.split('=')[1];
  }
});

const uploadToOSS = async () => {
  console.info(`上传文件到OSS....`);
  const { version } = require('./package.json');
  const updatePath = `client/update.json`;
  const versionUpdatePath = `client/${version}/update.json`;
  const updateX86Path = `client/${version}/rebuff_win_${version}_ia32.exe`;
  const updateX64Path = `client/${version}/rebuff_win_${version}_x64.exe`;
  const x86LocalPath = resolve(__dirname, `release/rebuff_win_${version}_ia32.exe`);
  const x64LocalPath = resolve(__dirname, `release/rebuff_win_${version}_x64.exe`);
  await Promise.all([
    client.multipartUpload(updatePath, Buffer.from(JSON.stringify({ version })), {}),
    client.multipartUpload(versionUpdatePath, Buffer.from(JSON.stringify({ version, title: '', content: '', x86: updateX86Path, x64: updateX64Path })), {}),
    client.multipartUpload(updateX86Path, x86LocalPath, {}),
    client.multipartUpload(updateX64Path, x64LocalPath, {}),
  ]);
  await Promise.all([
    client.putACL(updatePath, 'public-read'),
    client.putACL(versionUpdatePath, 'public-read'),
    client.putACL(updateX86Path, 'public-read'),
    client.putACL(updateX64Path, 'public-read'),
  ]);
  execSync(`rimraf ./release`);
};

const build = async (type: BuildType) => {
  process.env.BUILD_TYPE = type;
  console.info(`正在构建,请稍后....`);
  const { version } = require('./package.json');
  console.info(`代码构建....`);
  execSync(`cross-env BUILD_TYPE=${type} yarn run tscheck`, {
    stdio: [0, 1, 2],
  });
  execSync(`cross-env BUILD_TYPE=${type} yarn run build`, {
    stdio: [0, 1, 2],
  });
  console.info(`打包安装包....`);
  console.info(`构建32位安装包....`);
  execSync(`cross-env ARCH=ia32 electron-builder -c electron-builder.js -w --ia32`, { stdio: [0, 1, 2] });
  console.info(`构建64位安装包....`);
  execSync(`cross-env ARCH=x64 electron-builder -c electron-builder.js -w --x64`, { stdio: [0, 1, 2] });
  console.info(`git提交版本号....`);
  execSync(`(git diff-index --quiet HEAD || git commit -a -n -m "release:发布 ${version}") && git push`, {
    stdio: [0, 1, 2],
  });
  uploadToOSS();
};

const release = async () => {
  const answers = await prompt({ type: 'list', name: 'ReleaseType', message: '请选择要构建的版本', choices: ['次要版本', '主要版本', '核心版本', '无版本更新'] });
  releaseType = ReleaseType[answers.ReleaseType as keyof typeof ReleaseType];
  if (releaseType) {
    execSync(`yarn version ${releaseType}`, {});
  }
};

const run = async () => {
  if (buildType && ['pro', 'fat'].includes(buildType)) {
    /* 如果构建类型符合规则 */
    if (releaseType && buildType === 'pro') {
      if (['major', 'minor', 'patch', 'none'].includes(releaseType)) {
        /* 版本类型符合 */
        if (releaseType !== 'none') {
          execSync(`yarn version --${releaseType}`, {});
        }
      } else {
        await release();
      }
    } else {
      execSync('yarn version --prerelease --preid=beta', {});
    }
    build(buildType as BuildType);
  } else {
    prompt([
      {
        type: 'list',
        name: 'BuildType',
        message: '请选择要构建的环境',
        choices: ['生产', '测试'],
      },
    ]).then(async (answers: { BuildType: '生产' | '测试' }) => {
      if (answers.BuildType === '生产') {
        await release();
      } else {
        execSync('yarn version --prerelease --preid=beta', {});
      }
      build(BUILD_TYPE[answers.BuildType] as BuildType);
    });
  }
};
run();
