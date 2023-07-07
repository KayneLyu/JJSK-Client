/// <reference types="vite-electron-plugin/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true';
    DIST_ELECTRON: string;
    DIST: string;
    /** /dist/ or /public/ */
    PUBLIC: string;
    SQUIRREL_URL: string;
  }
}

interface WorkerMessage<O, R> {
  Method: string;
  Options?: O;
  Result?: R;
  Error?: string;
}
