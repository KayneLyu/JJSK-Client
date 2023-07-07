import { v4 as uuidV4 } from 'uuid';

/**
 * 生成UUID
 * */
export const uuid = () => uuidV4().replace(/-/g, '');

export const getGamePlatform = (games: Record<number, { platformId: GamePlatform }>) => {
  return Object.values(games).map(d => d.platformId);
};
