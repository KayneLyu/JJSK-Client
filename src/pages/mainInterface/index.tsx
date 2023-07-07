import React, { useEffect, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { HomeBackground, MainInterfaceContainer } from '@/assets/styles/MainInterfaceStyle';
import ClientHeader from '@/pages/mainInterface/ClientHeader';
import ClientFrame from '@/pages/ClientFrame';

type ClientFrameProps = {
  children?: ReactNode;
};

const Home = () => {
  useEffect(() => {}, []);
  return (
    <ClientFrame>
      <HomeBackground>
        <ClientHeader />
        <MainInterfaceContainer>
          <Outlet />
        </MainInterfaceContainer>
      </HomeBackground>
    </ClientFrame>
  );
};

export default Home;
