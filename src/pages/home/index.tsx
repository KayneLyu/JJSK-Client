import React, { useEffect } from 'react';
import HomePageBanner from './banner';
import HomePageContent from './content'
import HomePageAside from "./aside";
import { HomePageContainer, HomePageMainContent } from '@/assets/styles/HomePageStyle';

const HomePage = () => {
  useEffect(() => {}, []);
  return (
    <HomePageContainer>
      <HomePageMainContent>
          <HomePageBanner />
          <HomePageContent />
      </HomePageMainContent>
      <HomePageAside />
    </HomePageContainer>
  );
};

export default HomePage;
