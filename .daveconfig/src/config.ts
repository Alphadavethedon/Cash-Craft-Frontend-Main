interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";