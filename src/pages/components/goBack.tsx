import { FC } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@/assets/styles/ComponentsStyle';

// interface GoBackProps {
//     page: string
// }
type GoBackProps = {
  page: string;
};

const GoBackArrow: FC<GoBackProps> = ({ page }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/${page}`);
  };
  return (
    <ArrowBack>
      <div className="backArrow" onClick={goBack}>
        <i>
          <LeftOutlined />
        </i>
        <span>返回</span>
      </div>
    </ArrowBack>
  );
};

export default GoBackArrow;
