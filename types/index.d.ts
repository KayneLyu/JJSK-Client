type GamePlatform = 'steam' | 'epic' | 'gog' | 'origin' | 'rockstar' | 'uplay' | 'xbox';

type GamePlatforms = Record<number, { platformId: GamePlatform; flags: number; trainer?: { cheatCount: number } }>;
interface Game {
  id: number;
  zhCnName: string;
  name: string;
  detailLongImg: string;
  updateTimestamp: number;
  appSort: number;
  games: GamePlatforms;
  thumbnail: string;
  gameIds: number[];
}

interface SendCommandParams {
  command: string;
  arg: number;
}
interface SendCommandResult {
  success: boolean;
}
interface StartBuffParams {
  gameid: number;
  processid: number;
}
interface GetGameProcessInfoResult {
  name: string;
  path: string;
  pid: number;
  x64: boolean;
}
interface GameCheat {
  category: string;
  flags: number;
  hotkeys: number[][];
  name: string;
  target: string;
  type: string;
  uuid: string;
  zhCnName: string;
  args: Record<string, number>;
}
interface GetGameDetailsResult {
  gameBrief: {
    correlationIds: string[];
    edition: string;
    flags: number;
    fwgType: string;
    id: number;
    needReadHelp: number;
    platformId: string;
    purchaseUris: string[];
    supportFreeTrainer: number;
    titleId: number;
    trainer: {
      cheatCount: number;
      createdAt: number;
      players: number;
      rank: number;
      supportedVersions: number[];
      updatedAt: number;
    };
    versionPath: string;
  };
  gameDesc: {
    trainer: {
      blueprint: {
        cheats: GameCheat[];
        flags: number;
      };
      gameId: number;
      id: number;
      loader: string;
      loaderArgs: {
        dllMd5: string;
        dllUrl: string;
        trainerId: string;
      };
      releasedAt: number;
      supportedVersions: number[];
      titleId: number;
    };
  };
  title: {
    gameIds: number[];
    id: number;
    name: string;
    slug: string;
    thumbnail: string;
    zhCnName: string;
  };
}
