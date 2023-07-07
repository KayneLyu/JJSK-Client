import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { GameLibraryContainer, SelectGameButtonBox, SelectGameButton, GameTypeCheckBox, GamePagination, GameListContent } from '@/assets/styles/GameLibrary';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { PaginationProps } from 'antd';
import mirror from '@/assets/img/mirror.png';
import mygame from '@/assets/img/myGame.png';
import ElectronRenderModule from '@/samples/node-api';
import { useGlobalState } from '@/stores';
import { Input } from 'antd';
import { usePages } from '@/hooks';
import GameItem from '@/pages/components/GameItem';
import { useRequest } from 'ahooks';
import { getGameList } from '@/controllers/api.controller';

const options = [
  { label: '已安装', value: 'had' },
  { label: '未安装', value: 'even' },
];
const GameList = () => {
  const { data: GameListData } = useRequest(getGameList);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'user'>('all');
  const { userGames } = useGlobalState();
  // 多选框改单选
  const [chooseValue, setChooseValue] = useState<string | undefined>(undefined);
  // 选择已安装/未安装
  const hadInstallation = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.length) {
      if (checkedValues.length > 1) {
        checkedValues.shift();
      }
      if (checkedValues.length === 1) {
        setChooseValue(checkedValues[0].toString());
        // 发请求用 checkedValues[0]
      }
    }
    if (checkedValues.length === 0) {
      setChooseValue(undefined);
    }
    console.log('checked = ', checkedValues, chooseValue);
  };

  // 选择全部/我的 游戏
  const changeGameType = (type: 'all' | 'user') => {
    setFilterType(type);
    onPageChange({ num: 1, size: 12 });
  };

  // 分页/跳转页面
  const jumpPage: PaginationProps['onChange'] = (page, pageSize) => {
    onPageChange({ num: page, size: pageSize });
  };
  const ALlGameList = useMemo(() => {
    if (GameListData) {
      if (filterType === 'user') {
        return Object.values(GameListData.titles as unknown as Game[]).filter(d => userGames?.includes(d.id) && d.zhCnName.includes(search));
      }
      return Object.values(GameListData.titles as unknown as Game[]).filter(d => d.zhCnName.includes(search));
    }
    return [];
  }, [filterType, userGames, search, GameListData]);
  const { pages, onPageChange } = usePages(ALlGameList);
  useEffect(() => {
    ElectronRenderModule.getMyGames();
  }, []);
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <GameLibraryContainer>
      <div className="searchGame">
        <img className="mirror" src={mirror} alt="" />
        <Input type="text" placeholder="请输入你想游玩的游戏" onChange={onSearchChange} />
      </div>
      <SelectGameButtonBox>
        <div className="gameType">
          <div className="myGame">
            <SelectGameButton isActive={filterType === 'user'} onClick={() => changeGameType('user')}>
              <img className="myGameIcon" src={mygame} alt="" />
              <p>我的游戏</p>
            </SelectGameButton>
          </div>
          <SelectGameButton isActive={filterType === 'all'} onClick={() => changeGameType('all')}>
            全部游戏
          </SelectGameButton>
        </div>
        <div>
          <GameTypeCheckBox value={chooseValue as any} options={options} onChange={hadInstallation}></GameTypeCheckBox>
        </div>
      </SelectGameButtonBox>
      <GameListContent>
        {pages.map(item => (
          <GameItem key={item.id} {...item} />
        ))}
      </GameListContent>
      <GamePagination showQuickJumper showSizeChanger total={ALlGameList.length} defaultPageSize={12} pageSizeOptions={[12, 20, 52, 100]} onChange={jumpPage} />
    </GameLibraryContainer>
  );
};

export default GameList;
