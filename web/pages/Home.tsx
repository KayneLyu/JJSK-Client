import { StyledContent, StyledHeader, StyledHeaderInfo, StyledHomeContent, StyledLayout } from '@/assets/styles/web';
import React from 'react';
import HeaderTop from '../components/HeaderTop';
import Footer from '../components/Footer';
import img1 from '@/assets/img/web/img1.png';
import img2 from '@/assets/img/web/img2.png';
import download from '@/assets/img/web/downloadBtn2.png';
import img3 from '@/assets/img/web/img3.png';
import useDownload from '../hooks/useDownload';
import img4 from '@/assets/img/web/img4.png';
import { Link } from 'react-router-dom';
import img5 from '@/assets/img/web/img5.png';
import img6 from '@/assets/img/web/img6.png';
import img7 from '@/assets/img/web/img7.png';
import img8 from '@/assets/img/web/img8.png';
import img9 from '@/assets/img/web/img9.png';
import img10 from '@/assets/img/web/img10.png';
import img11 from '@/assets/img/web/img11.png';
import img12 from '@/assets/img/web/img12.png';
import { useRequest } from 'ahooks';
import { pubRecommend } from '@/controllers/api.controller';
import { pxToVw } from '../utils';

const gamePos = [
  { width: pxToVw(340), left: pxToVw(88), top: pxToVw(40) },
  { width: pxToVw(430), left: pxToVw(512), top: 0 },
  { width: pxToVw(420), right: pxToVw(460), top: pxToVw(60) },
  { width: pxToVw(310), right: pxToVw(96), top: pxToVw(100) },
  { width: pxToVw(256), left: pxToVw(-44), bottom: 0 },
  { width: pxToVw(466), left: pxToVw(210), bottom: pxToVw(60) },
  { width: pxToVw(256), left: pxToVw(704), bottom: 0 },
  { width: pxToVw(286), left: pxToVw(772), bottom: pxToVw(180) },
  { width: pxToVw(452), right: pxToVw(390), bottom: pxToVw(40) },
  { width: pxToVw(340), right: pxToVw(-20), bottom: pxToVw(60) },
];

const Home = () => {
  const { data } = useRequest(pubRecommend);
  const url = useDownload();
  return (
    <StyledLayout>
      <StyledHeader>
        <HeaderTop />
        <StyledHeaderInfo>
          <aside>
            <img src={img2} style={{ width: 560 }} />
            <a style={{ width: 270 }} href={url} target="_blank">
              <img src={download} />
            </a>
            <img src={img3} style={{ width: 130 }} />
          </aside>
          <img src={img1} style={{ width: 740 }} />
        </StyledHeaderInfo>
      </StyledHeader>
      <StyledContent>
        <StyledHomeContent>
          <div className="part1">
            <img src={img4} />
          </div>
          <div className="gameImgs">
            {data?.rows.slice(0, 10).map((d, i) => (
              <img key={d.gameId} src={d.thumbnail} style={gamePos[i]} />
            ))}
          </div>
          <Link to="/list" className="toList">
            <img src={img5} />
          </Link>
          <div className="part2">
            <img src={img6} />
            <section>
              <aside>
                <img src={img8} />
                <img src={img9} />
              </aside>
              <img src={img7} />
            </section>
          </div>
          <div className="part3">
            <img src={img10} />
            <section>
              <div className="safe">
                <img src={img11} />
                <span>是的！Redbuff修改器是由我们全球数以百万计的社区成员测试的</span>
              </div>
              <div className="easy">
                <img src={img12} />
                <span>Redbuff修改器消除了所有使用PC单机游戏修改器的复杂性。我们简单实 用，无缝衔接的界面提供了简单和安全个性化的游戏体验</span>
              </div>
            </section>
          </div>
        </StyledHomeContent>
        <Footer />
      </StyledContent>
    </StyledLayout>
  );
};

export default Home;
