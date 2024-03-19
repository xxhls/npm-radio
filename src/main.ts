import { join } from "path";
import fs from "fs-extra";
import axios from "axios";
import { configDotenv } from "dotenv";
import { info, warn, error, success } from "./log";
import { createTransport } from "nodemailer";
import { getContent, ContentOption } from "./templates/content";

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
    const { QQMAIL_USER, QQMAIL_PWD } = process.env;
    success("Environment variables are loaded from .env file");
    if (!QQMAIL_USER || !QQMAIL_PWD) {
        warn("Please set QQMAIL_user and QQMAIL_PWD in .env file");
        return;
    } else {
        success("QQMAIL_user and QQMAIL_PWD are set");
        info(`QQMAIL_user: ${QQMAIL_USER}`);
        info(`QQMAIL_PWD: ${QQMAIL_PWD}`);
    }

    /**
     * Get package info from npmjs.com
     * 
     * 1. Create an axios instance
     * 2. Get package info for each package
     * 3. Generate email content
     */
    const instance = axios.create({
        baseURL: "https://www.npmjs.com/package",
        timeout: 10000,
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
            "X-Requested-With": "XMLHttpRequest",
            "X-Spiferack": "1"
        }
    });

    const packages = ["axios", "@xxhls/get-license"]

    const infoList: Array<ContentOption> = [];
    const getPackageInfo = async (packageName: string) => {
        const response = await instance.get(`/${packageName}`);
        if (response.status !== 200) {
            warn(`Failed to get package info for ${packageName}`);

            infoList.push({
                name: packageName,
                description: "Failed to get package info",
                latest: "Failed to get package info",
                latestDownloads: 'Failed to get package info',
                latestWeek: 'Failed to get package info',
            });
        } else {
            success(`Got package info for ${packageName}`);
            const name = response.data["capsule"]["name"];
            const description = response.data["capsule"]["description"];
            const latest = response.data["capsule"]["dist-tags"]["latest"];
            const downloads = response.data["downloads"];
            const latestDownloads = downloads[downloads.length - 1]["downloads"];
            const latestWeek = downloads[downloads.length - 1]["label"];

            infoList.push({
                name,
                description,
                latest,
                latestDownloads,
                latestWeek,
            });
        }
    };
    const getAllPackagesInfo = Promise.all(packages.map((packageName) => getPackageInfo(packageName)));
    try {
        await getAllPackagesInfo;
        success("All package info are got successfully");
    } catch (__error) {
        error("Failed to get package info");
        console.error(__error);
    }

    /**
     * Send email
     * 
     * 1. Create a nodemailer transporter
     * 2. Set email options
     * 3. Send email
     */
    const transporter = createTransport({
        service: "qq",
        secure: true,
        auth: {
            user: QQMAIL_USER,
            pass: QQMAIL_PWD,
        },
    });

    info("Email text is generating...");
    const mailOptions = {
        from: QQMAIL_USER,
        to: QQMAIL_USER,
        subject: "Daily Report",
        text: getContent(infoList),
    };
    success("Email options are set successfully");
    info(`From: ${mailOptions.from}`);
    info(`To: ${mailOptions.to}`);
    info(`Subject: ${mailOptions.subject}`);

    info("Sending email...");
    transporter.sendMail(mailOptions, (__error, __info) => {
        if (__error) {
            error("Failed to send email");
            console.error(__error);
            return;
        }
        success(`Email sent successfully, messageId: ${__info.messageId}`);
    });
};

main();
