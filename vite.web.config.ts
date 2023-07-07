import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import ReactPlugin from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'node:path';

const API_SERVER: Record<string, string> = {
  dev: 'https://buffapi.syud.cn/',
  fat: 'https://buffapi.syud.cn/',
  pro: 'https://buffapi.syud.cn/',
};
const OSS_URL: Record<string, string> = {
  dev: 'https://xxbuff-test.oss-cn-hangzhou.aliyuncs.com',
  fat: 'https://xxbuff-test.oss-cn-hangzhou.aliyuncs.com',
  pro: 'https://xxbuff-test.oss-cn-hangzhou.aliyuncs.com',
};

const BUILD_TYPE = process.env.BUILD_TYPE || 'dev';
process.env.VITE_MAIN_SRC = '/web/main.tsx';
process.env.VITE_OSS_URL = OSS_URL[BUILD_TYPE];
process.env.VITE_API_URL = API_SERVER[BUILD_TYPE];

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    reportCompressedSize: false,
    sourcemap: BUILD_TYPE !== 'pro',
    rollupOptions: {
      output: {
        dir: 'dist-web',
        assetFileNames: assetInfo => {
          let extType = assetInfo.name?.split('.').at(1);
          if (extType) {
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            } else if (/css|sass|scss/i.test(extType)) {
              extType = 'styles';
            } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              extType = 'fonts';
            } else if (/json/.test(extType)) {
              extType = 'animations';
            }
            return `${extType}/[name]-[hash].[ext]`;
          }
          return 'others/[name]-[hash].[ext]';
        },
        manualChunks: id => {
          if (/[\\/]node_modules[\\/](lodash|lodash-es)[\\/]/.test(id)) {
            return 'lodash';
          }
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|history)[\\/]/.test(id)) {
            return 'react';
          }
          if (/[\\/]node_modules[\\/](@emotion)[\\/]/.test(id)) {
            return 'emotion';
          }
          if (/[\\/]node_modules[\\/](antd)[\\/]/.test(id)) {
            return 'antd';
          }
          /* TODO 在此处扩展各自项目的分包需求 */
        },
      },
    },
  },
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
    legacy({}),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    }),
    ReactPlugin({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    viteCompression(),
  ],
  define: {
    'process.env': {
      BUILD_TYPE,
      API_URL: API_SERVER[BUILD_TYPE],
    },
  },
});
