declare module "../config.json" {
    export const api: {
      baseUrl: string;
      endpoints: {
        auth: string;
        transactions: string;
        users: string;
        reports: string;
      };
    };
    // Add other type definitions
}