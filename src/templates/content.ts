export interface ContentOption {
    name: string,
    description: string,
    latest: string,
    yesterdayDownloads: string,
    yesterdayDate: string,
};

export const getContent = (options: Array<ContentOption>) => {
    const content = `
        Daily Report
        ============
            Hello, this is your daily report.
            ${options.map((option) => {
                return `
                ${option.name} v${option.latest} (${option.description}) has ${option.yesterdayDownloads} downloads in the ${option.yesterdayDate}.
                `;
            }).join("\n")}
    `;
    return content;
};
