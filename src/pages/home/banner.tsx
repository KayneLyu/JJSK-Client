import React, { useState } from 'react';
import { BannerOverSize, BannerOverItem, test, HomePageBannerBox } from '@/assets/styles/HomePageStyle';
import banner from '@/assets/img/banner.jpg';
import bannerImg1 from '@/assets/img/bannerImg1.png';

const HomePageBanner = () => {
  const [menuData, setMenuItem] = useState([
    // { key: 1, label: '主页' },
    // { key: 2, label: '游戏库' },
    { key: 3, label: '/vipCenter' },
  ]);
  return (
    <HomePageBannerBox>
      <BannerOverSize autoplay dots={{ className: test }}>
        {menuData.map(item => (
          <BannerOverItem to={item.label} key={item.key}>
            <img src={banner} alt="" className='bg' />
            {/*<img src={bannerImg1} className='tips'/>*/}
          </BannerOverItem>
        ))}
      </BannerOverSize>
    </HomePageBannerBox>
  );
};

export default HomePageBanner;
