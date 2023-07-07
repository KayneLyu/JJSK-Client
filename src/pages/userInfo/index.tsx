import { UserInfoPageContainer, UserInfoTable } from '@/assets/styles/UserInfoStyle';
import user from '@/assets/img/user.png';
import { Button } from 'antd';
import { useGlobalOperate, useGlobalState } from '@/stores';
import { useEffect, useMemo } from 'react';
import defaultAvatar from '@/assets/img/user.png';

const UserInfo = () => {
  const { userInfo } = useGlobalState();
  const { showLoginModal } = useGlobalOperate();
  useEffect(() => {
    if (!userInfo) {
      showLoginModal(1);
    }
  }, [userInfo]);
  const userAvatar = useMemo(() => {
    /*if (userInfo?.avatar) { TODO
      return userInfo.avatar;
    }*/
    return defaultAvatar;
  }, []);
  const onPatchPWD = () => {
    showLoginModal(3);
  };
  return (
    <UserInfoPageContainer>
      <UserInfoTable>
        <ul>
          <li className="infoTitle">基本信息</li>
          <li>
            <p>头像</p>
            <img src={userAvatar} alt="" />
          </li>
          <li>
            <p>注册日期</p>
            <span>{userInfo?.registerTime}</span>
          </li>
          <li>
            <p>ID</p>
            <span>{userInfo?.id}</span>
          </li>
          <li>
            <p>昵称</p>
            <span>{userInfo?.nickName}</span>
          </li>
        </ul>

        <ul>
          <li className="infoTitle">安全信息</li>
          <li>
            <p>账号</p>
            <span>{userInfo?.email}</span>
          </li>
          <li>
            <p>密码</p>
            <span>{userInfo?.spwd ? '已绑定' : '未绑定'}</span>
            <Button onClick={onPatchPWD}>修改密码</Button>
          </li>
          <li>
            <p>手机号</p>
            <span>{userInfo?.swx ? '已绑定' : '未绑定'}</span>
            <Button>绑定手机</Button>
          </li>
          <li>
            <p>邮箱</p>
            <span>2023-03-20</span>
            <Button>{userInfo?.smail ? '已绑定' : '未绑定'}</Button>
          </li>
        </ul>
      </UserInfoTable>
    </UserInfoPageContainer>
  );
};

export default UserInfo;
