import steam from '@/assets/icons/steam.png';
import epic from '@/assets/icons/epic.png';
import gog from '@/assets/icons/gog.png';
import origin from '@/assets/icons/origin.png';
import rockstar from '@/assets/icons/rockstar.png';
import uplay from '@/assets/icons/uplay.png';
import xbox from '@/assets/icons/xbox.png';

export const PASSWORD_PATTERN = /^[A-Za-z0-9]{6,12}$/i;

export const GAME_ICONS: Record<GamePlatform, string> = {
  steam,
  epic,
  gog,
  origin,
  rockstar,
  uplay,
  xbox,
};
