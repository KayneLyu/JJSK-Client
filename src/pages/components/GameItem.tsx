import React, { FC } from 'react';
import { StyledGameItem } from '@/assets/styles/ComponentsStyle';
import { GAME_ICONS } from '@/utils/constants';

const GameItem: FC<Game> = ({ id, thumbnail, zhCnName, games }) => {
  return (
    <StyledGameItem to={`/game/${id}`}>
      <img src={thumbnail} alt="" />
      <section>
        <p>{zhCnName}</p>
        <ul>
          {Object.values(games).map(
            d =>
              GAME_ICONS[d.platformId] && (
                <li key={d.platformId}>
                  <img src={GAME_ICONS[d.platformId]} alt="" />
                  <p>
                    {d.platformId}-支持{d.trainer?.cheatCount || 0}项修改
                  </p>
                </li>
              ),
          )}
        </ul>
      </section>
    </StyledGameItem>
  );
};

export default GameItem;
