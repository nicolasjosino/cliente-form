import { Injectable } from '@angular/core';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor() {}

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, context, data } = entry;
    let log = `[${timestamp}] [${level}]`;
    if (context) log += ` [${context}]`;
    log += `: ${message}`;
    if (data) log += ` | Data: ${JSON.stringify(data)}`;
    return log;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  info(message: string, context?: string, data?: any) {
    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level: 'INFO',
      message,
      context,
      data,
    };
    console.log(this.formatLog(entry));
  }

  warn(message: string, context?: string, data?: any) {
    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level: 'WARN',
      message,
      context,
      data,
    };
    console.warn(this.formatLog(entry));
  }

  error(message: string, context?: string, data?: any) {
    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level: 'ERROR',
      message,
      context,
      data,
    };
    console.error(this.formatLog(entry));
  }
}
