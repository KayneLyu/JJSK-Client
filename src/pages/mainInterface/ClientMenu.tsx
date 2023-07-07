import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { StyledClientMenu, StyledClientMenuLi } from '@/assets/styles/ClientMenu';
interface IMenuData {
  key: string;
  label: string;
}
const ClientMenu = () => {
  const [menuData, setMenuItem] = useState([
    { key: '/', label: '主页' },
    { key: '/game', label: '游戏库' },
    { key: '/vipCenter', label: '会员中心' },
  ]);

  const location = useLocation();
  console.log(location.pathname);

  // useEffect(() => {}, []);
  return (
    <div>
      <StyledClientMenu>
        {menuData.map((item: IMenuData) => (
          <StyledClientMenuLi to={item.key} key={item.key}>
            {item.label}
          </StyledClientMenuLi>
        ))}
      </StyledClientMenu>
    </div>
  );
};

export default ClientMenu;
