import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBack from '@/pages/components/goBack';
import {
  cssProcessList,
  KeyModificationContainer,
  KeyModifyBox,
  StyledExitWD,
  StyledGameCheatList,
  StyledGameSupport,
  StyledGameSupportPlatform,
  StyledGameTitle,
  StyledStartButton,
  StyledUseIntroduction,
  StyledUseStep,
} from '@/assets/styles/KeyModificationStyle';
import ElectronRenderModule from '@/samples/node-api';
import { useGlobalOperate, useGlobalState } from '@/stores';
import dayjs from 'dayjs';
import { GAME_ICONS } from '@/utils/constants';
import gameImg from '@/assets/img/gameImg.png';
import StartBuff from '@/assets/img/startBuff.png';
import { useRequest } from 'ahooks';
import { getGameList } from '@/controllers/api.controller';
import CheatItem from '@/pages/components/CheatItem';
import ExitWDModal from '@/components/ExitWDModal';
import DisclaimerModal from '@/components/DisclaimerModal';
import { StyledModal } from '@/assets/styles/web';
import { Select } from 'antd';

const KeyModification = () => {
  const params = useParams<{ id: string }>();
  const [gameId, setGameId] = useState<number>();
  const [exitWDVisible, setExitWDVisible] = useState(false);
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);
  const [gameProcessVisible, setGameProcessVisible] = useState(false);
  const [processId, setProcessId] = useState<number>();
  const { data: GameListData } = useRequest(getGameList);
  const { userGameProcessInfo, userGameDetail, userInfo, useGameProcessList } = useGlobalState();
  const { showLoginModal } = useGlobalOperate();
  const navigate = useNavigate();
  const game = useMemo(() => {
    if (GameListData) {
      return Object.values(GameListData.titles as unknown as Game[]).find(d => d.id === Number(params.id));
    }
  }, [params.id, GameListData]);
  const cheatCount = useMemo(() => {
    if (game?.games && gameId) {
      return game.games[gameId]?.trainer?.cheatCount || 0;
    }
    return 0;
  }, [game?.games, gameId]);
  const isVIP = useMemo(() => {
    return userInfo?.userType === 2;
  }, [userInfo?.userType]);
  const onStartBuff = () => {
    if (userInfo) {
      if (isVIP) {
        if (gameId) {
          if (userGameProcessInfo) {
            ElectronRenderModule.StartBuff({
              gameId,
              processId: userGameProcessInfo.pid,
            });
          } else if (processId) {
            setGameProcessVisible(false);
            ElectronRenderModule.StartBuff({
              gameId,
              processId: processId,
            });
            setProcessId(undefined);
          } else {
            ElectronRenderModule.getProcessList();
            setGameProcessVisible(true);
          }
        }
      } else {
        navigate('/vipCenter');
      }
    } else {
      showLoginModal(1);
    }
  };

  const onPlatformChange = (id: number) => {
    setGameId(id);
  };
  const onShowExitWD = () => {
    setExitWDVisible(true);
  };
  const onCloseExitWD = () => {
    setExitWDVisible(false);
  };
  const onShowDisclaimer = () => {
    setDisclaimerVisible(true);
  };
  const onCloseDisclaimer = () => {
    setDisclaimerVisible(false);
  };
  const onCloseGameProcessList = () => {
    setGameProcessVisible(false);
  };
  useEffect(() => {
    if (gameId) {
      ElectronRenderModule.getGameDetails({ gameId });
      ElectronRenderModule.getGameProcessInfo({ gameId });
    }
  }, [gameId]);
  useEffect(() => {
    if (game?.gameIds) {
      const first = game.gameIds[0];
      if (first) setGameId(Number(first));
    }
  }, [game?.gameIds]);
  const onProcessChange = (val: number) => {
    setProcessId(val);
  };
  const processList = useMemo(() => {
    return useGameProcessList?.filter(d => d.name && d.pid);
  }, [useGameProcessList]);
  const defaultProcess = useMemo(() => {
    return processList?.[0];
  }, [processList]);
  return (
    <KeyModificationContainer>
      <div className="key_modification_content">
        <KeyModifyBox>
          <ArrowBack page={'game'} />
          <StyledGameTitle className="game_title">
            <div>
              <p className="game_zh_name">{game?.zhCnName}</p>
              <p className="game_en_name">{game?.name}</p>
            </div>
            <div className="update_date">
              <p>最新更新时间</p>
              <p className="last_date">{game && dayjs(game.updateTimestamp).format('YYYY-MM-DD')}</p>
            </div>
          </StyledGameTitle>
          {game && (
            <StyledGameSupport>
              <main>
                {game.gameIds.map(key => (
                  <GameSupportPlatform key={key} active={gameId === Number(key)} gameId={Number(key)} games={game.games} onPlatformChange={onPlatformChange} />
                ))}
              </main>
              <aside>共支持{cheatCount}项修改</aside>
            </StyledGameSupport>
          )}
          <img src={gameImg} className="divider" />
          <StyledGameCheatList>
            {userGameDetail?.gameDesc?.trainer?.blueprint?.cheats?.map(d => (
              <CheatItem key={d.uuid} {...d} />
            ))}
          </StyledGameCheatList>
        </KeyModifyBox>
        <StyledUseIntroduction>
          <p className="introduction_title">使用说明</p>
          <StyledUseStep
            direction="vertical"
            progressDot
            current={4}
            items={[
              {
                title: '步骤一',
                description: (
                  <StyledExitWD>
                    退出杀毒软件并关闭WindowsDefender
                    <a onClick={onShowExitWD}>如何关闭WindowsDefender?</a>
                  </StyledExitWD>
                ),
              },
              {
                title: '步骤二',
                description: '启动游戏 (注：非正版游戏修改可能无法生效)',
              },
              {
                title: '步骤三',
                description: '游戏运行后点击“一键加BUFF按钮”',
              },
              {
                title: '步骤四',
                description: '等待提示“BUFF加持成功”后，可开始修改',
              },
            ]}
          />
          <div className="check_box_set">
            <p className="introduction_title">功能设置</p>
            <div className="choose_checkbox">
              <input type="checkbox" defaultChecked />
              <span>修改器生效后下次启动默认开启上次修改的配置</span>
            </div>
          </div>
          <div className="check_box_set">
            <p className="introduction_title">免责协议</p>
            <div className="choose_checkbox">
              <input type="checkbox" defaultChecked />
              <span>
                我已阅读并充分理解
                <a className="disclaimer" onClick={onShowDisclaimer}>
                  《Redbuff免责使用说明》
                </a>
              </span>
            </div>
          </div>
          <StyledStartButton onClick={onStartBuff}>
            <img src={StartBuff} />
          </StyledStartButton>
        </StyledUseIntroduction>
      </div>
      <ExitWDModal visible={exitWDVisible} onClose={onCloseExitWD} />
      <DisclaimerModal visible={disclaimerVisible} onClose={onCloseDisclaimer} />
      <StyledModal title="请选择游戏" open={gameProcessVisible} destroyOnClose onCancel={onCloseGameProcessList} centered onOk={onStartBuff}>
        <Select
          defaultValue={defaultProcess?.pid}
          value={processId}
          onChange={onProcessChange}
          className={cssProcessList}
          options={
            processList?.map(d => ({
              value: d.pid,
              label: d.name,
            })) || []
          }
        />
      </StyledModal>
    </KeyModificationContainer>
  );
};

const GameSupportPlatform: FC<{ gameId: number; games: GamePlatforms; active: boolean; onPlatformChange: (gameId: number) => void }> = ({ gameId, games, active, onPlatformChange }) => {
  const platform = games[gameId];
  const platformId = platform?.platformId;
  const onPlatformClick = () => {
    onPlatformChange(gameId);
  };
  if (platformId && GAME_ICONS[platformId]) {
    return (
      <StyledGameSupportPlatform active={active} onClick={onPlatformClick}>
        <img src={GAME_ICONS[platformId]} />
        <span>{platformId}</span>
      </StyledGameSupportPlatform>
    );
  }
  return null;
};

export default KeyModification;
