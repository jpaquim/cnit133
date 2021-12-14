// import adapter from "@sveltejs/adapter-netlify";
import adapter from 'svelte-adapter-deno';
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  kit: {
    adapter: adapter({
      // default options are shown
      out: 'build',
      deps: './deps.ts' // (relative to adapter-deno package)
    }),
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "src/variables.sass"',
          },
        },
      },
    },
  },

  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      scss: {
        prependData: '@import "src/variables.sass"',
      },
    }),
  ],
};

export default config;
