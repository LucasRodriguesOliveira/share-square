export interface ICacheService {
  store(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  remove(key: string): Promise<boolean>;
}
