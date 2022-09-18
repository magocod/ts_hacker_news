declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME?: string;
      PORT?: string;
      DB?: string;
      DB_USER?: string;
      DB_PASS?: string;
      DB_NAME?: string;
      DB_HOST?: string;
      ACTIVE_SCHEDULE_TASKS?: string;
    }
  }
}

export {};
