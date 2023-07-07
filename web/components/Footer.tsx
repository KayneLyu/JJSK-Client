import { StyledFooter } from '@/assets/styles/web';
import useDownload from '../hooks/useDownload';
import TermsOfService from './TermsOfService';
import { useState } from 'react';
import DeveloperDisablesService from './DeveloperDisablesService';

const Footer = () => {
  const [tOfSVisible, setTOfSVisible] = useState(false);
  const [dDSVisible, setDDSVisible] = useState(false);
  const url = useDownload();
  const onTermsOfServiceClose = () => {
    setTOfSVisible(false);
  };
  const onShowTermsOfService = () => {
    setTOfSVisible(true);
  };
  const onDDSClose = () => {
    setDDSVisible(false);
  };
  const onShowDDS = () => {
    setDDSVisible(true);
  };
  return (
    <StyledFooter>
      <div className="content">
        <div className="map">
          <a href="/" target="_blank">
            网站首页
          </a>
          <a href={url} target="_blank">
            修改器下载
          </a>
          <a href="" target="_blank">
            联系我们
          </a>
          <a onClick={onShowTermsOfService}>服务条款</a>
          <a onClick={onShowDDS}>开发者禁用服务</a>
          {/*<a href="" target="_blank">
            网站地图
          </a>*/}
        </div>
        <div className="about">
          <div className="name">公司名称</div>
          <div className="cName">最全面的单机游戏修改网站</div>
          <a href="" target="_blank">
            鄂ICP备20230214715号
          </a>
        </div>
        <div className="link">
          友情链接:
          <a href="" target="_blank">
            什么游戏
          </a>
          <a href="" target="_blank">
            什么游戏
          </a>
        </div>
      </div>
      <TermsOfService visible={tOfSVisible} onClose={onTermsOfServiceClose} />
      <DeveloperDisablesService visible={dDSVisible} onClose={onDDSClose} />
    </StyledFooter>
  );
};

export default Footer;
