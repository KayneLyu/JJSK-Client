import { Button, Input, Space } from 'antd';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

interface CustomInputNumberProps {
  value?: number;
  onChange?: (val: number) => void;
  defaultVal?: number;
  min?: number;
  max?: number;
  step?: number;
}
const CustomInputNumber: FC<CustomInputNumberProps> = ({ value, onChange, defaultVal = 1, min, max, step = 1 }) => {
  const [val, setVal] = useState(value || defaultVal);
  const onValChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (Number.isNaN(num)) setVal(num);
  };
  const onAdd = () => {
    setVal(v => {
      if (max && v >= max) {
        return max;
      }
      return v + step;
    });
  };
  const onReduce = () => {
    setVal(v => {
      if (min && v <= min) {
        return min;
      }
      return v - step;
    });
  };
  useEffect(() => {
    onChange?.(val);
  }, [val]);
  return (
    <Space.Compact>
      <Button type="primary" onClick={onReduce}>
        -
      </Button>
      <Input value={val} onChange={onValChange} />
      <Button type="primary" onClick={onAdd}>
        +
      </Button>
    </Space.Compact>
  );
};

export default CustomInputNumber;
