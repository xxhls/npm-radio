import { join } from "path";
import fs from "fs-extra";
import { configDotenv } from "dotenv";
import { info, warn, error } from "./log/index";
import { createTransport } from "nodemailer";

const main = async () => {
    
    /**
     * Load environment variables from .env file
     * 
     * 1. Check if .env file exists
     * 2. Load environment variables from .env file
     * 3. Check if QQMAIL_user and QQMAIL_PWD are set
     */
    const envPath = join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) {
        warn("No .env file found");
        return;
    }
    try {
        configDotenv();
    } catch (__error) {
        error("Failed to load environment variables from .env file");
        console.error(__error);
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

    const transporter = createTransport({
        service: "qq",
        secure: true,
        auth: {
            user: QQMAIL_user,
            pass: QQMAIL_PWD,
        },
    });

    const mailOptions = {
        from: QQMAIL_user,
        to: QQMAIL_user,
        subject: "Hello",
        text: "Hello world?",
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
};

main();
