// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://ashwinhprasad.github.io',
    markdown: {
        shikiConfig: {
          theme: 'github-light',
        },
      },
});
