// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from "astro-pagefind";


export default defineConfig({
    site: 'https://ashwinhprasad.github.io/',
    integrations: [pagefind(
        
    )],
});
