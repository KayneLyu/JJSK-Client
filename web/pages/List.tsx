import { StyledContent, StyledGameItem, StyledHeader, StyledLayout, StyledListGame, StyledListSearch } from '@/assets/styles/web';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import HeaderTop from '../components/HeaderTop';
import Footer from '../components/Footer';
import { Input, PaginationProps } from 'antd';
import { GamePagination } from '@/assets/styles/GameLibrary';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons';
import { GAME_ICONS } from '@/utils/constants';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { pubList, PubListResult } from '@/controllers/api.controller';

const List = () => {
  const { data, run } = useRequest(pubList, { manual: true });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const jumpPage: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page);
  };
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  useEffect(() => {
    run({ kw: search, pageNum: page });
  }, [search, page]);
  return (
    <StyledLayout>
      <StyledHeader style={{ height: 400 }}>
        <HeaderTop />
        <StyledListSearch>
          <header>
            目前我们支持
            <b>{data?.total.toLocaleString()}</b>
            款游戏的修改
          </header>
          <Input placeholder="请填写你想玩的游戏" prefix={<SearchOutlined />} onChange={onSearchChange} />
        </StyledListSearch>
      </StyledHeader>
      <StyledContent>
        <StyledListGame>
          <header>
            <span style={{ flex: 1 }}>游戏</span>
            <span style={{ width: 100 }}>支持修改项</span>
            <span style={{ width: 260 }}>支持平台</span>
            <span style={{ width: 100 }}>最新更新</span>
            <span style={{ width: 100 }}>状态</span>
          </header>
          <main>
            {data?.rows.map(d => (
              <GameItem key={d.id} {...d} />
            ))}
          </main>
          <GamePagination showQuickJumper current={page} showSizeChanger={false} total={data?.total || 0} onChange={jumpPage} />
        </StyledListGame>
        <Footer />
      </StyledContent>
    </StyledLayout>
  );
};

const GameItem: FC<PubListResult> = ({ thumbnail, zhCnName, updateTimestamp, cheatCount, platforms }) => {
  return (
    <StyledGameItem>
      <img src={thumbnail} />
      <div className="name">{zhCnName}</div>
      <div className="count">{cheatCount}</div>
      <div className="platform">
        {platforms.map(
          d =>
            GAME_ICONS[d] && (
              <div key={d}>
                <img src={GAME_ICONS[d]} alt="" />
                <span>{d}</span>
              </div>
            ),
        )}
      </div>
      <div className="update">{dayjs(updateTimestamp).fromNow()}</div>
      <div className="status">
        <CheckOutlined />
        可用
      </div>
    </StyledGameItem>
  );
};

export default List;
