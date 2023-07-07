import React, { FC, useMemo } from 'react';
import { HomePageAsideContainer, HomePageAsideItem } from '@/assets/styles/HomePageStyle';

import dayjs from 'dayjs';
import NewIcon from '@/assets/icons/new.svg';
import { getGamePlatform } from '@/utils';
import { GAME_ICONS } from '@/utils/constants';
import { useRequest } from 'ahooks';
import { getGameList } from '@/controllers/api.controller';

const HomePageAside = () => {
  const { data: GameList } = useRequest(getGameList);
  const list = useMemo<Game[]>(() => {
    if (GameList) {
      return Object.values(GameList.titles as unknown as Game[])
        .sort((a, b) => {
          return b.updateTimestamp - a.updateTimestamp;
        })
        .slice(0, 10);
    }
    return [];
  }, [GameList]);
  return (
    <HomePageAsideContainer>
      <header>
        <NewIcon />
        最新更新
      </header>
      <main>
        {list.map(item => (
          <GameItem key={item.id} {...item} />
        ))}
      </main>
    </HomePageAsideContainer>
  );
};

const GameItem: FC<Game> = ({ id, thumbnail, zhCnName, updateTimestamp, games }) => {
  const platforms = useMemo(() => getGamePlatform(games), [games]);
  return (
    <HomePageAsideItem to={`/game/${id}`}>
      <img className="asideItemImage" src={thumbnail} alt="" />
      <div className="asideInfo">
        <span>{zhCnName}</span>
        <div className="asideIcons">{platforms.map(platform => GAME_ICONS[platform] && <img key={platform} className="itemIcon" src={GAME_ICONS[platform]} alt="" />)}</div>
        <div className="updateDate">更新时间：{dayjs(updateTimestamp).fromNow()}</div>
      </div>
    </HomePageAsideItem>
  );
};

export default HomePageAside;
