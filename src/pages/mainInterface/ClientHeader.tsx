import { useMemo, useState } from 'react';
import { MainInterfaceClientHeader, RedBuffLogo, UserInfoBox } from '@/assets/styles/MainInterfaceStyle';
import { useNavigate } from 'react-router-dom';
import ClientMenu from '@/pages/mainInterface/ClientMenu';
import logo from '@/assets/img/LOGO.png';
import serverpic from '@/assets/img/server.png';
import vip from '@/assets/img/vip.png';
import defaultAvatar from '@/assets/img/user.png';
import { useGlobalOperate, useGlobalState } from '@/stores';

const ClientHeader = () => {
  const { userInfo } = useGlobalState();
  const { showLoginModal } = useGlobalOperate();

  const navigate = useNavigate();
  const goUserInfoPage = () => {
    if (userInfo) {
      navigate('/user');
    } else {
      showLoginModal(1);
    }
  };
  const isVIP = useMemo(() => {
    return userInfo?.userType === 2;
  }, [userInfo?.userType]);
  const userAvatar = useMemo(() => {
    /*if (userInfo?.avatar) { TODO
      return userInfo.avatar;
    }*/
    return defaultAvatar;
  }, []);
  return (
    <MainInterfaceClientHeader>
      <RedBuffLogo>
        <img src={logo} alt="" />
      </RedBuffLogo>
      <ClientMenu />
      <UserInfoBox isVip={isVIP} onClick={goUserInfoPage}>
        {userInfo && (
          <div className="userAvatar">
            <img src={userAvatar} alt="" />
          </div>
        )}
        <div className="userName">{userInfo?.nickName || '登陆/注册'}</div>
        {isVIP && (
          <div className="isVip">
            <img src={vip} alt="" />
          </div>
        )}
        <img className="concatServer" src={serverpic} alt="" />
      </UserInfoBox>
    </MainInterfaceClientHeader>
  );
};

export default ClientHeader;
