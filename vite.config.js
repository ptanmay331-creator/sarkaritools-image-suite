import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        sscPhotoResizer: 'ssc-photo-resizer.html',
        upscPhotoResizer: 'upsc-photo-resizer.html',
        ibpsPhotoResizer: 'ibps-photo-resizer.html',
        passportPhoto: 'passport-photo.html',
        signatureResizer: 'signature-resizer.html',
        imageToPdf: 'image-to-pdf.html'
      }
    }
  }
});
