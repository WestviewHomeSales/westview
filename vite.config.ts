import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    // Embed environment variables at build time for production
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://kcauwltavmlzwbzyjklm.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYXV3bHRhdm1sendienlqa2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDIwODAsImV4cCI6MjA2NDExODA4MH0.ZTPMsacwlY5m6YzmJJncxvUCoiCxlM3XCSB4ArPmLzQ')
  },
  // Set base to '' to ensure truly relative paths for assets in the build output.
  // This is crucial for deployments to subfolders on a server or via FTP,
  // as it prevents paths from being interpreted as absolute from the domain root.
  base: '',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  }
});
