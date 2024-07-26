class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;

  private constructor() {
    this.logLevel = LogLevel.INFO;
    this.journal = [];
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(logLevel: LogLevel): void {
    this.logLevel = logLevel;
  }

  public debug(message: string, tag?: string): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG${tag ? ` - ${tag}` : ""}] ${message}`);
    }
  }

  public info(message: string, tag?: string): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`[INFO${tag ? ` - ${tag}` : ""}] ${message}`);
    }
  }

  public warn(message: string, tag?: string): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(`[WARN${tag ? ` - ${tag}` : ""}] ${message}`);
    }
  }

  public error(message: string, tag?: string): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`[ERROR${tag ? ` - ${tag}` : ""}] ${message}`);
    }
  }
}

enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export default Logger;
