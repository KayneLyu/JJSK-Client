import React, { useEffect, useMemo, useState } from 'react';
import { VipPageContainer, VipTypeCard, VipPayQRcode, QRcodePayFor, QRCodeBox, StyledUserCz, StyledCheat } from '@/assets/styles/VipPageStyle';
import { useNavigate } from 'react-router-dom';
import { AlipayCircleOutlined, WechatOutlined, ThunderboltFilled } from '@ant-design/icons';
import { QRCode, Slider, Switch, Segmented } from 'antd';
import { getGoodList, OrderType } from '@/controllers/api.controller';
import platformSupportGif from '@/assets/img/vipPage/plat_support.gif';
import halfYearCard from '@/assets/img/vipPage/halfYearCard.png';
import yearCard from '@/assets/img/vipPage/yearCard.png';
import monthCard from '@/assets/img/vipPage/monthCard.png';
import { useRequest } from 'ahooks';
import { userPayOrder } from '@/controllers/user.controller';
import UserIcon from '@/assets/icons/user.svg';
import CustomInputNumber from '@/components/CustomInputNumber';

const VIPImages = [monthCard, halfYearCard, yearCard];
const VipCenter = () => {
  const { data } = useRequest(getGoodList);
  const { data: order, loading, run } = useRequest(userPayOrder, { manual: true });

  const [selectType, setSelectType] = useState<{ type: number; price: string }>();
  const [orderType, setOrderType] = useState<OrderType>(0);
  const navigate = useNavigate();
  const QRCodeStatus = useMemo<'active' | 'expired' | 'loading'>(() => {
    if (loading) {
      return 'loading';
    }
    return 'active';
  }, [loading]);

  const choosePayType = (type: OrderType) => {
    setOrderType(type);
  };
  const changeVipType = (type: number, price: string) => {
    setSelectType({ type, price });
  };

  const showQRCode = () => {
    if (selectType) {
      run({ orderType, goodsId: selectType.type });
    }
  };

  // 导航
  const toCDKPage = () => {
    navigate('cdk');
  };
  useEffect(() => {
    if (data) {
      setSelectType({ type: data.rows[0].goodsId, price: data.rows[0].discountPrice });
    }
  }, [data]);
  useEffect(() => {
    if (order && selectType?.type) {
      run({ orderType, goodsId: selectType.type });
    }
  }, [selectType?.type, orderType]);

  return (
    <VipPageContainer>
      <p className="cdkTips">
        如果你在其他平台获取了redbuff的CDK，你可以 <span onClick={toCDKPage}>点击前往激活</span>
      </p>
      <div className="payTypeBox">
        <div className="payForType">
          {data?.rows.map((item, i) => (
            <VipTypeCard isActive={selectType?.type === item.goodsId} key={item.goodsId} onClick={() => changeVipType(item.goodsId, item.discountPrice)}>
              <img src={VIPImages[i]} alt="" />
              <div className="textBox">
                <p className="typeOfText">{item.goodsName}</p>
                <p className="daysOfText">
                  <span>{item.duration}</span> <span>天</span>
                </p>
                <p className="priceOfText">{`¥ ${item.discountPrice}`}</p>
              </div>
            </VipTypeCard>
          ))}
        </div>
        <VipPayQRcode>
          <div className="QRcode">
            <QRCodeBox firstTimeLoad={!order}>
              <QRCode size={200} bordered={false} status={QRCodeStatus} onRefresh={showQRCode} value={order?.qrcode || 'qrcode'} />
            </QRCodeBox>
            {!order && (
              <p className="QRcodeTips" onClick={showQRCode}>
                点击显示付款码
              </p>
            )}
          </div>

          <div className="QRcodePayType">
            <QRcodePayFor payForActive={orderType === 0} onClick={() => choosePayType(0)}>
              <i>
                <WechatOutlined />
              </i>
              <span>支付宝</span>
            </QRcodePayFor>
            <QRcodePayFor payForActive={orderType === 1} onClick={() => choosePayType(1)}>
              <i>
                <AlipayCircleOutlined />
              </i>
              <span>微信</span>
            </QRcodePayFor>
          </div>

          <div className="paymentAmount">
            <p>
              支付金额：<span>{`¥ ${selectType?.price}`}</span>
            </p>
          </div>

          <div className="agreement">
            <p>
              完成购买视为同意<span>《会员协议》</span>
            </p>
          </div>
        </VipPayQRcode>
      </div>

      <div className="illustrate">
        <div className="illustrate_left">
          <div className="platform_support ">
            <p>丰富的游戏与平台支持</p>
            <span className="desc">提供Steam、Epic等众多主流游戏平台多达1900+款热门游戏修改 器支持！</span>
            <img src="" alt="" />
          </div>
          <div className="platform_choose">
            <p>确定&安全的选择</p>
            <span className="desc">奇妙助手修改器室由我们数以百万计会员共同测试的。稳定可靠 及安全的实现方式，让您畅享游戏</span>
            <img src={platformSupportGif} alt="" />
          </div>
        </div>
        <div className="illustrate_right">
          <p>操作应用简单</p>
          <span className="desc">消除了PC单机游戏修改器的复杂性，简单实用，无缝衔接的界面，简单的交互操 作方式，提供了简单个性化游戏体验能力</span>
          <StyledUserCz>
            <UserIcon />
            玩家
          </StyledUserCz>
          <StyledCheat>
            <div className="item">
              <ThunderboltFilled />
              无限生命值
            </div>
            <div className="item">
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            </div>
            <div className="item">
              <Segmented options={['切换', '数字键1']} />
            </div>
          </StyledCheat>
          <StyledCheat>
            <div className="item">
              <ThunderboltFilled />
              无限耐力
            </div>
            <div className="item">
              <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
            </div>
            <div className="item">
              <Segmented options={['切换', '数字键2']} />
            </div>
          </StyledCheat>
          <StyledCheat>
            <div className="item">
              <ThunderboltFilled />
              无限内存
            </div>
            <div className="item">
              <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
            </div>
            <div className="item">
              <Segmented options={['切换', '数字键3']} />
            </div>
          </StyledCheat>
          <StyledCheat>
            <div className="item">
              <ThunderboltFilled />
              隐身模式
            </div>
            <div className="item">
              <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
            </div>
            <div className="item">
              <Segmented options={['切换', '数字键1']} />
            </div>
          </StyledCheat>
          <StyledCheat>
            <div className="item">
              <ThunderboltFilled />
              编辑最大承载重量
            </div>
            <div className="item">
              <CustomInputNumber />
            </div>
            <div className="item">
              <Segmented options={['增加', 'ALT', 'Q']} />
            </div>
          </StyledCheat>
          <StyledCheat>
            <div className="item">
              <ThunderboltFilled />
              设定移动速度
            </div>
            <div className="item">
              <Slider defaultValue={30} />
            </div>
            <div className="item">
              <Segmented options={['减少', 'CTRL', 'W']} />
            </div>
          </StyledCheat>
        </div>
      </div>
    </VipPageContainer>
  );
};

export default VipCenter;
