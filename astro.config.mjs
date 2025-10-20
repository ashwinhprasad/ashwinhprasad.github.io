// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from "astro-pagefind";
import mdx from "@astrojs/mdx"
import react from '@astrojs/react';

export default defineConfig({
    site: 'https://ashwinhprasad.github.io/',
    integrations: [pagefind(),
    mdx(),react()
    ],
});
