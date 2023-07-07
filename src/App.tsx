import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StyledGlobal } from '@/assets/styles/Global';
import Router from '@/Router';
import ClientFrame from '@/pages/ClientFrame';
import Login from '@/components/Login';
import { getUserInfo } from '@/controllers/user.controller';

const emotionCache = createCache({
  key: 'key',
  container: document.body,
});
getUserInfo();
const App = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
        <Global styles={StyledGlobal} />

        <Router />
        <Login />
      </ConfigProvider>
    </CacheProvider>
  );
};

export default App;
