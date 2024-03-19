import { configDotenv } from "dotenv";

const main = async () => {
    // Load environment variables from .env file
    configDotenv();
    const { QQMAIL_user, QQMAIL_PWD } = process.env;
    console.log(QQMAIL_user, QQMAIL_PWD);

};

main();
