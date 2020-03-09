import {createClient, RedisClient} from 'redis';
import {RedisConfig} from "../XFormServerConfig";

interface Props extends RedisConfig {
  onError: (error: any) => void
}

export default class Redis {
  private readonly client: RedisClient;

  constructor(props: Props) {
    this.client = createClient({
      host: props.host,
      port: props.port
    });
    this.client.on("error", (err: any) => {
      console.error("Error in redis: " + err);
      props.onError(err);
    });
  }

  public getClient(): RedisClient {
    return this.client;
  }

  public setValue(key: string, value: any, expireTime: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let formatValue = null;
      if (value) {
        formatValue = JSON.stringify(value);
      }
      if (expireTime) {
        this.client.set(key, formatValue, "EX", expireTime, (error: any, result: any) => {
          if (error) {
            reject(new Error(`error in set value in redis ${error.message}`))
          } else {
            resolve(result);
          }
        });
      } else {
        this.client.set(key, formatValue, (error: any, result: any) => {
          if (error) {
            reject(new Error(`error in set value in redis ${error.message}`))
          } else {
            resolve(result);
          }
        });
      }
    });
  }

  public getValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error: any, result: any) => {
        if (error) {
          reject(new Error(`error in get value in redis ${error.message}`))
        } else {
          if (!result) {
            resolve(null);
          } else if (typeof result === 'string' && result.indexOf('{') >= 0) {
            let newValue = result;
            try {
              newValue = JSON.parse(result);
            } catch (e) {
              resolve(result);
            }
            resolve(newValue);
          } else {
            resolve(result);
          }
        }
      });
    });
  }

  public getKeys(limit?: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.client.keys('*', (error: any, keys: string[]) => {
        if (error) {
          reject(new Error(`error in get value in redis ${error.message}`))
        } else {
          if (!keys) {
            resolve([]);
          } else {
            const newLimit = limit ? limit : keys.length;
            const out = [];
            for (let i = 0; i < keys.length && i < newLimit; i++) {
              out.push(keys[i]);
            }
            resolve(out);
          }
        }
      });
    });
  }

  public deleteKey(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error: any) => {
        if (error) {
          reject(new Error(`error in delete value in redis ${error.message}`))
        } else {
          resolve();
        }
      });
    });
  }

  public closeClient(): Promise<void> {
    return new Promise((resolve) => {
      if (this.client) {
        this.client.quit();
      }
      resolve();
    });
  }
}

