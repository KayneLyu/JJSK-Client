import React, { FC, useMemo, useState } from 'react';
import { ImmutableObject } from '@hookstate/core';
import ElectronRenderModule from '@/samples/node-api';
import { Button, InputNumber, Segmented, Slider, Space, Switch } from 'antd';
import { StyledCheat } from '@/assets/styles/VipPageStyle';
import { ThunderboltFilled } from '@ant-design/icons';

const CheatItem: FC<ImmutableObject<GameCheat>> = ({ zhCnName, name, type, target, args, hotkeys }) => {
  const [numberVal, setNumberVal] = useState(args?.['min'] || 0);
  const onToggleAction = (checked: boolean) => {
    ElectronRenderModule.sendCommand({
      command: target,
      arg: checked ? 1 : 0,
    });
  };
  const onSliderAction = (val: number) => {
    ElectronRenderModule.sendCommand({
      command: target,
      arg: val,
    });
  };
  const onButtonAction = () => {
    ElectronRenderModule.sendCommand({
      command: target,
      arg: args['value'],
    });
  };
  const onNumberTypeChange = (val: number | null) => {
    if (val !== null) setNumberVal(val);
  };
  const onSetNumber = () => {
    ElectronRenderModule.sendCommand({
      command: target,
      arg: numberVal,
    });
  };
  const action = useMemo(() => {
    if (type === 'toggle') {
      return <Switch defaultChecked={false} checkedChildren="开启" unCheckedChildren="关闭" onChange={onToggleAction} />;
    }
    if (type === 'slider') {
      return <Slider defaultValue={1} step={args['step']} min={args['min']} max={args['max']} onChange={onSliderAction} />;
    }
    if (type === 'button') {
      return <Button onClick={onButtonAction}>应用</Button>;
    }
    if (type === 'number') {
      return (
        <Space.Compact>
          <InputNumber value={numberVal} defaultValue={args['min']} min={args['min']} max={args['max']} step={args['step']} onChange={onNumberTypeChange} />
          <Button onClick={onSetNumber}>设置</Button>
        </Space.Compact>
      );
    }
  }, [type]);
  return (
    <StyledCheat>
      <div className="item">
        <ThunderboltFilled />
        {zhCnName || name}
      </div>
      <div className="item">{action}</div>
      <div className="item">
        <Segmented options={['减少', 'CTRL', 'W']} />
      </div>
    </StyledCheat>
  );
};

export default CheatItem;
