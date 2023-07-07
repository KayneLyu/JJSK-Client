import styled from '@emotion/styled';
import { Space } from 'antd';

export const StyledClientFrame = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const StyledClientFrameHeader = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  height: 34px;
  min-height: 34px;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 0 20px;
  -webkit-app-region: drag;
  user-select: none;
  color: #fff;
  z-index: 9;
`;

export const StyledClientFrameHeaderAside = styled.aside`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;
export const StyledClientFrameHeaderMain = styled(Space)`
  -webkit-app-region: no-drag;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #e0e0e0;
  .ant-space-item {
    cursor: pointer;
  }
`;
