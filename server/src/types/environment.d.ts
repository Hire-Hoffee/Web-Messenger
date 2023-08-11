declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SECRET_ACCESS: string;
      SECRET_REFRESH: string;
      DATABASE_URL: string;
      SERVER_URL: string;
    }
  }
}

export {};
