import { StyledHeaderTop } from '@/assets/styles/web';
import logo from '@/assets/img/web/LOGO.png';
import { NavLink } from 'react-router-dom';
import download from '@/assets/img/web/downloadBtn1.png';
import React from 'react';
import useDownload from '../hooks/useDownload';
import Helmet from 'react-helmet';
import LogoIcon from '@/assets/icons/logo.png';

const HeaderTop = () => {
  const url = useDownload();
  return (
    <StyledHeaderTop>
      <Helmet>
        <link rel="icon" type="image/png" href={LogoIcon} sizes="32x32" />
      </Helmet>
      <img src={logo} className="logo" />
      <div className="nav">
        <NavLink to={'/'}>首页</NavLink>
        <NavLink to={'/list'}>游戏列表</NavLink>
      </div>
      <a href={url} target="_blank" className="download">
        <img src={download} />
      </a>
    </StyledHeaderTop>
  );
};

export default HeaderTop;
