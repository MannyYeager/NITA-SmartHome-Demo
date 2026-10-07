import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite handles React refresh and Tailwind's utility generation for the app.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
