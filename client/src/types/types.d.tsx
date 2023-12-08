declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module 'uuid' {
  export function v1(options?: any, buffer?: any, offset?: any): string;
  export function v3(options?: any, buffer?: any, offset?: any): string;
  export function v4(options?: any, buffer?: any, offset?: any): string;
  export function v5(options?: any, buffer?: any, offset?: any): string;
  export const NIL: string;
}