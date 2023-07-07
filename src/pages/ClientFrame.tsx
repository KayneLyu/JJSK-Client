import React, { FC, ReactNode, useMemo, useState } from 'react';
import { getCurrentWindow } from '@electron/remote';
import { StyledClientFrame, StyledClientFrameHeader, StyledClientFrameHeaderAside, StyledClientFrameHeaderMain } from '@/assets/styles/ClientFrame';
import { CloseOutlined, MinusOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Modal, Radio, RadioChangeEvent } from 'antd';
import { useRequest } from 'ahooks';
import { userLogout } from '@/controllers/user.controller';
import { useNavigate } from 'react-router-dom';
import { getLocalData, setLocalData } from '@/stores/local';

type ClientFrameProps = {
  children?: ReactNode;
};
const win = getCurrentWindow();

const ClientFrame: FC<ClientFrameProps> = ({ children }) => {
  const navigate = useNavigate();
  const { run } = useRequest(userLogout, { manual: true });

  const [quitWay, setQuitWay] = useState('mini');
  const onMinimizeWindow = () => {
    win.minimize();
  };

  const onCloseWindow = () => {
    const appQuit = getLocalData('appQuit', null);
    if (appQuit) {
      if (quitWay === 'mini') {
        win.minimize();
      } else {
        win.close();
      }
    } else {
      setLocalData('appQuit', quitWay);
      showQuitWay(onCloseWindow);
    }
  };
  const onAppQuitWayChange = (e: RadioChangeEvent) => {
    setQuitWay(e.target.value);
    setLocalData('appQuit', e.target.value);
  };
  const showQuitWay = (callback?: () => void) => {
    Modal.confirm({
      title: '系统设置',
      content: (
        <>
          关闭窗口时：
          <Radio.Group defaultValue={quitWay} onChange={onAppQuitWayChange}>
            <Radio value="mini">最小化窗体</Radio>
            <Radio value="exit">退出主程序</Radio>
          </Radio.Group>
        </>
      ),
      okText: '我知道了',
      onOk: callback,
    });
  };
  const onSysSetting = () => {
    showQuitWay();
  };
  const onLogout = () => {
    run();
  };
  const toCKD = () => {
    navigate('/vipCenter/cdk');
  };
  const items = useMemo(() => {
    return [
      {
        key: 'cdk',
        label: <>CDK兑换</>,
        onClick: toCKD,
      },
      {
        key: 'sys',
        label: <>系统设置</>,
        onClick: onSysSetting,
      },
      {
        key: 'logout',
        label: <>退出登陆</>,
        onClick: onLogout,
      },
    ];
  }, []);

  return (
    <StyledClientFrame>
      <StyledClientFrameHeader>
        <StyledClientFrameHeaderAside />
        <StyledClientFrameHeaderMain>
          <MinusOutlined onClick={onMinimizeWindow} />
          <Dropdown menu={{ items }}>
            <MenuOutlined />
          </Dropdown>
          <CloseOutlined onClick={onCloseWindow} />
        </StyledClientFrameHeaderMain>
      </StyledClientFrameHeader>
      {children}
    </StyledClientFrame>
  );
};

export default ClientFrame;
