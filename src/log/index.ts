import chalk from "chalk";

export const info = (message: string) => {
    console.log(chalk.white.bgGray.bold(" INFO  \t"), chalk.gray(message));
}

export const debug = (message: string) => {
    console.log(chalk.white.bgBlue.bold(" DEBUG \t"), chalk.blue(message));
}

export const warn = (message: string) => {
    console.log(chalk.white.bgYellow.bold(" WARN  \t"), chalk.yellow(message));
}

export const error = (message: string) => {
    console.log(chalk.white.bgRed.bold(" ERROR \t"), chalk.red(message));
}

export const success = (message: string) => {
    console.log(chalk.white.bgGreen.bold(" SUCCE \t"), chalk.green(message));
}
