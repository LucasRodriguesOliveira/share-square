import { EnvMode } from './mode.enum';
import { ResourceConfig } from './resource.interface';

export type AppResource = 'passenger' | 'square';

export interface AppConfig {
  port: number;
  host: string;
  mode: EnvMode;
  resources: Record<AppResource, ResourceConfig>;
}
