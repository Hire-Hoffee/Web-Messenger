declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SECRET_ACCESS: string;
      SECRET_REFRESH: string;
      DATABASE_URL: string;
      CLIENT_URL: string;
    }
  }
}

export {};
