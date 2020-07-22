declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'dev' | 'test' | 'production';
            PORT?: string;
            PWD: string;
            HASH_1_SECRET: string;
        }
    }
}

export {}