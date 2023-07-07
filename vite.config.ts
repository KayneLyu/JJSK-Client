import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import ReactPlugin from '@vitejs/plugin-react';
import electron from 'vite-electron-plugin';
import { loadViteEnv } from 'vite-electron-plugin/plugin';
import renderer from 'vite-plugin-electron-renderer';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const OSS_URL: Record<string, string> = {
  dev: 'https://xxbuff-test.oss-cn-hangzhou.aliyuncs.com',
  fat: 'https://xxbuff-test.oss-cn-hangzhou.aliyuncs.com',
  pro: 'https://xxbuff-test.oss-cn-hangzhou.aliyuncs.com',
};

const API_SERVER: Record<string, string> = {
  dev: 'https://buffapi.syud.cn/',
  fat: 'https://buffapi.syud.cn/',
  pro: 'https://buffapi.syud.cn/',
};
const BUILD_TYPE = process.env.BUILD_TYPE || 'dev';
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist', { recursive: true, force: true });

  const sourcemap = command === 'serve';
  process.env.VITE_MAIN_SRC = '/src/main.tsx';
  process.env.VITE_OSS_URL = OSS_URL[BUILD_TYPE];
  process.env.VITE_API_URL = API_SERVER[BUILD_TYPE];
  return {
    server: {
      hmr: true,
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins: [
      ReactPlugin({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin', ['@babel/plugin-proposal-decorators', { legacy: true }]],
        },
      }),
      svgr({
        exportAsDefault: true,
        svgrOptions: {
          icon: true,
        },
      }),
      electron({
        outDir: 'dist',
        include: ['electron'],
        transformOptions: {
          sourcemap,
        },
        plugins: [
          // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
          loadViteEnv(),
        ],
      }),
      renderer(),
      viteStaticCopy({
        targets: [
          {
            src: './package.json',
            dest: './',
            transform(content) {
              const data = JSON.parse(content.toString());
              data.main = 'main/index.js';
              delete data.scripts;
              delete data.devDependencies;
              return JSON.stringify(data);
            },
          },
        ],
      }),
    ],
    clearScreen: false,
  };
});
