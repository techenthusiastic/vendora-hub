export interface AppConfig {
  environment: 'development' | 'production' | 'test' | 'staging';
  host: string;
  port: number;
}
