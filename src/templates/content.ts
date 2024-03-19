export interface ContentOption {
    name: string,
    description: string,
    latest: string,
    latestDownloads: string,
    latestWeek: string,
};

export const getContent = (options: Array<ContentOption>) => {
    const content = `
        Daily Report
        ============
            Hello, this is your daily report.
            ${options.map((option) => {
                return `
                ${option.name} v${option.latest} (${option.description}) has ${option.latestDownloads} downloads in the last ${option.latestWeek}.
                `;
            }).join("\n")}
    `;
    return content;
};
