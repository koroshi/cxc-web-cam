// src/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      UPLOAD_DIR: string;
    }
  }
}

// 确保这个文件被 TypeScript 编译
export {};
