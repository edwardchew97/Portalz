import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      sys: "util",
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      _stream_duplex: "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
      _stream_passthrough: "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
      _stream_readable: "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
      _stream_writable: "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
      _stream_transform: "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
    },
  },
  build: {
    rollupOptions: {},
    commonjsOptions: {
      include: [],
    },
    target: ["es2020"],
  },
  optimizeDeps: {
    disabled: false,
    esbuildOptions: {
      // Node.js global to browser globalThis
      target: "es2020",
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
