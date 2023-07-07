import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledClientMenu = styled.ul`
  box-sizing: border-box;
  padding: 0;
  margin: 0 0 0 45px;
  list-style: none;
  display: flex;
`;

export const StyledClientMenuLi = styled(NavLink)`
  box-sizing: border-box;
  width: 120px;
  text-align: center;
  font-weight: 700;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  color: #666bcf;
  text-decoration: none;
  &:hover a {
    color: #a1feff;
  }
  &.active {
    background: linear-gradient(to bottom, #1c2048, #1c2769);
    box-shadow: -5px -5px 10px -4px rgb(30, 35, 72), 5px -5px 10px -4px rgb(30, 35, 72);
    transform-origin: center bottom;
    vertical-align: bottom;
    border-bottom: 2px solid #a1feff;
    font-size: 22px;
    font-weight: bold;
    color: #a1feff;
  }
`;
