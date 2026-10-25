import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jtkonzult.com.ng',
  compressHTML: true,
  build: {
    format: 'directory'
  }
});
