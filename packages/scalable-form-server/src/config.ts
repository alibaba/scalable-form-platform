/**
 * 默认
 */
export const INIT_STATUS_DEFAULT = 'default';
/**
 * 数据库连接失败
 */
export const INIT_STATUS_DB_ERROR = 'DB_ERROR';
/**
 * 缓存连接失败
 */
export const INIT_STATUS_CACHE_ERROR = 'CACHE_ERROR';
/**
 * 部分table连接失败
 */
export const INIT_STATUS_TABLE_ERROR = 'TABLE_ERROR';
/**
 * 初始化成功
 */
export const INIT_STATUS_SUCCESS = 'SUCCESS';

export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_ERROR = 500;
export const STATUS_CODE_NOT_FOUND = 404;

export function getDataInitSQL(tableName) {
  return `
      create table if not exists ${tableName} (
          id            int auto_increment primary key,
          schema_uuid   varchar(100) null,
          form_data     json         null,
          create_time   datetime     not null,
          last_modified datetime     not null,
          user_id       varchar(100) null,
          user_name     varchar(100) null,
          user_type     varchar(100) null,
          cost_time     int          null,
          browser       varchar(100) null,
          os            varchar(100) null,
          is_deleted    int default 0 null
      );
      
      create index ${tableName}_browser_index
          on ${tableName} (browser);
      
      create index ${tableName}_cost_time_index
          on ${tableName} (cost_time);
      
      create index ${tableName}_create_time_index
          on ${tableName} (create_time);
      
      create index ${tableName}_last_modified_index
          on ${tableName} (last_modified);
      
      create index ${tableName}_os_index
          on ${tableName} (os);
      
      create index ${tableName}_schema_uuid_index
          on ${tableName} (schema_uuid);
      
      create index ${tableName}_user_id_index
          on ${tableName} (user_id);
      
      create index ${tableName}_is_deleted_index
          on ${tableName} (is_deleted);

    `
}

export function getSchemaInitSQL(tableName: string): string {
  return `
      create table if not exists ${tableName}(
            id            int auto_increment primary key,
            uuid          varchar(200)  not null,
            title         varchar(1000) not null,
            visit_count   int default 0 not null,
            data_count    int default 0 not null,
            create_time   datetime      not null,
            last_modified datetime      not null,
            form_schema   json          not null,
            creator_id    varchar(200)  not null,
            creator_name  varchar(200)  not null,
            creator_type  varchar(200)  not null,
            is_deleted    int default 0 not null,
            constraint ${tableName}_uuid_index unique (uuid)
      );
      create index ${tableName}_create_time_index on ${tableName} (create_time);
      create index ${tableName}_creator_id_index on ${tableName} (creator_id);
      create index ${tableName}_creator_name_index on ${tableName} (creator_name);
      create index ${tableName}_data_count_index on ${tableName} (data_count);
      create index ${tableName}_is_deleted_index on ${tableName} (is_deleted);
      create index ${tableName}_last_modified_index on ${tableName} (last_modified);
    `
}
