import { configDotenv } from "dotenv";
import { info, warn, error } from "./log/index";

const main = async () => {
    // Load environment variables from .env file
    try {
        configDotenv();
    } catch (__error) {
        error("Failed to load environment variables from .env file");
        info("Please make sure you have a .env file in the root directory");
    }
    const { QQMAIL_user, QQMAIL_PWD } = process.env;
    info("Environment variables are loaded from .env file");
    if (!QQMAIL_user || !QQMAIL_PWD) {
        warn("Please set QQMAIL_user and QQMAIL_PWD in .env file");
        return;
    } else {
        info("QQMAIL_user and QQMAIL_PWD are set");
        info(`QQMAIL_user: ${QQMAIL_user}`);
        info(`QQMAIL_PWD: ${QQMAIL_PWD}`);
    }

};

main();
