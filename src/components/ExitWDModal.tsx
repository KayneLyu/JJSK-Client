import React, { FC } from 'react';
import { StyledModal } from '@/assets/styles/web';
import ExitWDImg1 from '@/assets/img/exitWDImg1.png';
import ExitWDImg2 from '@/assets/img/exitWDImg2.png';
import ExitWDImg3 from '@/assets/img/exitWDImg3.png';
import ExitWDImg4 from '@/assets/img/exitWDImg4.png';
import ExitWDImg5 from '@/assets/img/exitWDImg5.png';
import ExitWDImg6 from '@/assets/img/exitWDImg6.png';
import ExitWDImg7 from '@/assets/img/exitWDImg7.png';
import ExitWDImg8 from '@/assets/img/exitWDImg8.png';
import ExitWDImg9 from '@/assets/img/exitWDImg9.png';
import ExitWDImg10 from '@/assets/img/exitWDImg10.png';

interface ExitWDModalProps {
  visible: boolean;
  onClose: () => void;
}
const ExitWDModal: FC<ExitWDModalProps> = ({ visible, onClose }) => {
  return (
    <StyledModal title="如何关闭WindowsDefender?" width={900} open={visible} onCancel={onClose} footer={null} centered>
      <p>
        Windows10中自带的杀毒软件Windows Defender会实时保护电脑并对文件进行检测，很多人习惯自己安装其他的杀毒程序，这便容易产生冲突，Windows
        Defender也可能造成删除某些软件的补丁，所以玩家会想尽办法的去关掉Windows Defender服务，这篇文章就来教教大家如何关闭Windows defender服务！
      </p>
      <p>第1步：关闭 “实时保护” 和 “算改保护”</p>
      <p>1.1 打开Windows系统设置，点击“更新与安全”；</p>
      <p>
        <img src={ExitWDImg1} style={{ width: '100%' }} />
      </p>
      <p>1.2 在 “Windows安全中心” 中点击 “病毒和威胁防护” ；</p>
      <p>
        <img src={ExitWDImg2} style={{ width: '100%' }} />
      </p>
      <p>1.3 点击 “病毒和威胁防护” 设置页面中的 “管理设置”；</p>
      <p>
        <img src={ExitWDImg3} style={{ width: '100%' }} />
      </p>
      <p>1.4 依次关闭“实时保护”、“云提供的保护”、“自动提交样本” 和 “算改防护” 四项（若按钮是灰色无法 修改，那可能你的第一方软件已通过其他方式为您关闭了，无需再操作）</p>
      <p>
        <img src={ExitWDImg4} style={{ width: '100%' }} />
      </p>
      <p>第2步：修改组策略</p>
      <p>2.1 按下快捷键：Windows+R打开运行窗口（若快捷键无效，可在桌面左下角任务栏搜索“运行”）</p>
      <p>2.2 在运行窗口输入“gpedit.msc”，点击确定；</p>
      <p>
        <img src={ExitWDImg5} />
      </p>
      <p>2.3 在打开的窗口中依次双击“计算机配置” → “模板管理”→ “Windows组件” → “WindowsDefender防病毒”；</p>
      <p>
        <img src={ExitWDImg6} style={{ width: '100%' }} />
      </p>
      <p>
        <img src={ExitWDImg7} style={{ width: '100%' }} />
      </p>
      <p>
        <img src={ExitWDImg8} style={{ width: '100%' }} />
      </p>
      <p>
        <img src={ExitWDImg9} style={{ width: '100%' }} />
      </p>
      <p>2.4 在右侧列表中找到“关闭Windows Defender防病毒”，并双击打开；</p>
      <p>
        <img src={ExitWDImg10} />
      </p>
      <p>2.5 在新打开的窗口中，选择 “已启用”，点击 “确定” ，即可完成关闭。</p>
    </StyledModal>
  );
};

export default ExitWDModal;
