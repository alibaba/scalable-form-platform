export interface MySQLConfig {
  host: string,
  tablePrefix?: string,
  port: number,
  password?: string,
  user: string,
  database: string,
}

export interface RedisConfig {
  host: string;
  port: number;
}

export interface XFormServerConfig {
  path?: string,
  sqlLite?: boolean,
  mysql?: MySQLConfig,
  redis?: RedisConfig
}
