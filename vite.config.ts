import { defineConfig } from "vite";
import path from "path";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        about: path.resolve(import.meta.dirname, "about.html"),
        certifications: path.resolve(import.meta.dirname, "certifications.html"),
        contact: path.resolve(import.meta.dirname, "contact.html"),
        cv: path.resolve(import.meta.dirname, "cv.html"),
        cvv: path.resolve(import.meta.dirname, "cvv.html"),
        projects: path.resolve(import.meta.dirname, "projects.html"),
        services: path.resolve(import.meta.dirname, "services.html"),
        resources: path.resolve(import.meta.dirname, "resources.html"),
        testimonials: path.resolve(import.meta.dirname, "testimonials.html"),
        sponsor: path.resolve(import.meta.dirname, "sponsor.html"),
        demo: path.resolve(import.meta.dirname, "demo.html"),
        sax: path.resolve(import.meta.dirname, "sax.html"),
        notfound: path.resolve(import.meta.dirname, "404.html"),
        products: path.resolve(import.meta.dirname, "products.html"),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: false,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
