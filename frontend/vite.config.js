import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for TechStock frontend
 * @author Monir Bishara
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Use a different port than the backend
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});
