import React, { createContext } from 'react';
import Logger, { defaultLogFunc } from './Logger';

/**
 * LoggerContext，可以获得Logger实例
 * @type {React.Context<Logger>}
 */
const LoggerContext: React.Context<Logger> = createContext<Logger>(new Logger(defaultLogFunc));

export default LoggerContext;
