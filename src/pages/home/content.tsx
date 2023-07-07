import React, { useEffect, useMemo } from 'react';
import { HomePageHotGame, HomePageContentTitle } from '@/assets/styles/HomePageStyle';
import { useNavigate } from 'react-router-dom';
import HotIcon from '@/assets/icons/hot.svg';
import { HomePageHotGameList } from '@/assets/styles/ComponentsStyle';
import GameItem from '@/pages/components/GameItem';
import { useRequest } from 'ahooks';
import { getGameList } from '@/controllers/api.controller';

const Content = () => {
  const { data: GameListData } = useRequest(getGameList);
  const navigate = useNavigate();
  const goGameLibraryPage = () => {
    navigate('/game');
  };
  const list = useMemo(() => {
    if (GameListData) {
      return Object.values(GameListData.titles as unknown as Game[])
        .sort((a, b) => {
          return b.appSort - a.appSort;
        })
        .slice(0, 6);
    }
    return [];
  }, [GameListData]);
  return (
    <HomePageHotGame>
      <HomePageContentTitle>
        <div className="hotestGame">
          <HotIcon />
          <span>最热门</span>
        </div>
        <p onClick={goGameLibraryPage}>查看全部</p>
      </HomePageContentTitle>
      <HomePageHotGameList>
        {list.map(item => (
          <GameItem key={item.id} {...item} />
        ))}
      </HomePageHotGameList>
    </HomePageHotGame>
  );
};

export default Content;
