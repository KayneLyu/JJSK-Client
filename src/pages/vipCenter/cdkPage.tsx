import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CDKPageContainer, CDKInputBox, RecordHistory } from '@/assets/styles/CDKPageStyle';
import { FieldTimeOutlined, SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import BackArrow from "@/pages/components/goBack";
import editIcon from '@/assets/img/cdkPage/edit_icon.png';

const CDKPage = () => {
  const navigate = useNavigate();

  const recordList = [
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
    {
      id: 1,
      date: '2023-03-19',
      cdk: 'JHGVSDD-SADAF-ASFDAG',
      goods: '30天免费会员',
    },
  ];
  return (
    <CDKPageContainer>
      <BackArrow page={"vipCenter"} />

      <p className="title">Redbuff-cdk兑换</p>

      <CDKInputBox>
        <div>
          <img src={editIcon} alt="" />
          <input type="text" placeholder="请填写您获得的平台CDK" />
        </div>
        <Button>立即兑换</Button>
      </CDKInputBox>

      <RecordHistory>
        <p className="recordTitle"> 兑换记录 </p>
        <div className="recordTableHeader">
          <div className="recordDate">
            <i>
              <FieldTimeOutlined />
            </i>
            <span>兑换时间</span>
          </div>
          <div className="recordCDK">
            <i>
              <SearchOutlined />
            </i>
            <span>使用CDK</span>
          </div>
          <div className="recordGoods">
            <i>
              <ShoppingOutlined />
            </i>
            <span>兑换物品</span>
          </div>
        </div>

        <ul className="recordTable">
          {recordList.length > 0 ? (
            recordList.map(item => (
              <li className="recordItem" key={item.id}>
                <div className="recordData">
                  <p>{item.date}</p>
                  <p>{item.cdk}</p>
                  <p>{item.goods}</p>
                </div>
              </li>
            ))
          ) : (
            <div className="noData">
              <Empty description="暂无兑换记录" />
            </div>
          )}
        </ul>
      </RecordHistory>
    </CDKPageContainer>
  );
};

export default CDKPage;
