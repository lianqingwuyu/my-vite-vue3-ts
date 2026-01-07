declare module 'layouts-generated' {
  export function setupLayouts(routes: any[]): any[];
}

declare module 'virtual:generated-pages' {
  const generatedRoutes: any[];
  export default generatedRoutes;
}

declare module '~pages' {
  const pages: any[];
  export default pages;
}

declare module 'unplugin-auto-import/vite' {
  import { Plugin } from 'vite';

  interface AutoImportOptions {
    imports?: Array<string | Record<string, any>>;
    dirs?: string[];
    dts?: boolean | string;
    // 根据实际 API 添加更多选项
  }

  function autoImport(options?: AutoImportOptions): Plugin;
  export default autoImport;
}

