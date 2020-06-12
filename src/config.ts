export default {
    serverPort: undefined,

    initConfig(conf) {
        this.serverPort = conf.port;
    },
};