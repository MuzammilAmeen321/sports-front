export default defineConfig({
    server: {
      proxy: {
        '/public/api': {
          target: 'https://matc.matchdada.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
  