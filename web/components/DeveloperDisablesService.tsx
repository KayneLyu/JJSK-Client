import React, { FC } from 'react';
import { StyledModal } from '@/assets/styles/web';

interface DeveloperDisablesServiceProps {
  visible: boolean;
  onClose: () => void;
}
const DeveloperDisablesService: FC<DeveloperDisablesServiceProps> = ({ visible, onClose }) => {
  return (
    <StyledModal title="服务条款" open={visible} onCancel={onClose} footer={null} centered>
      <p>一、 Redbuff 是一款绿色软件，我们坚决抵制玩家破坏游戏环境、影响他人游戏平衡的行为 故我们提供SDK供开发者使用，以控制 Redbuff 是否被允许在游戏中应用。</p>
      <p>二、如果您不允许我们在游戏中使用功能，可以使用此SDK对 Redbuff 进行禁用。 SDK：redsdk://enable=false</p>
      <p>使用方法：使用浏览器在地址栏中输入redsdk://enable=false 然后跳转并确定该命令 即可成功禁用 Redbuff 。</p>
      <p>
        1. Redbuff is a kind of green software. We firmly resist players' behaviors of destroying the game environment and affecting others' game balance. Therefore, we provide SDK for developers to
        control whether Redbuff is allowed to be used in the game.
      </p>
      <p>2. If you do not allow us to use the function in the game, you can use this SDK to disable Redbuff . SDK： redsdk://enable=false</p>
      <p>How to use: use the browser to input in the address bar redsdk://enable=false Then jump and confirm the command to disable Redbuff successfully.</p>
    </StyledModal>
  );
};

export default DeveloperDisablesService;
