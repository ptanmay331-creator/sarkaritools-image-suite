# SarkariTools Image Suite

A browser-based utility for preparing application photos and signatures, converting images, and creating PDFs. Selected image files are processed locally in the browser; the app does not upload them to a server.

## Requirements

- Node.js 20.19 or newer
- npm

## Run locally

```powershell
npm install
npm run dev
```

## Production build

```powershell
npm run build
npm run preview
```

The production build creates four static pages in `dist/`: the main tool and dedicated passport-photo, signature-image, and image-to-PDF guides. The repository includes a GitHub Actions workflow to build and deploy `dist/` to GitHub Pages:

1. Push this project to a public GitHub repository.
2. In the repository, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
3. Push to the `main` branch. The workflow builds the site and publishes it. The live URL appears under **Settings → Pages**.

The app enforces per-image and PDF-batch limits to reduce browser memory pressure. Browsers may differ in image encoding and file-size results. The instruction parser is a convenience, not a guarantee that it understands every notice. Always compare the output with the exact requirements shown by the relevant application portal.

## Search visibility (free)

1. Once the public site is live, create a free Google Search Console property. For a GitHub Pages address, use the **URL-prefix** property and verify ownership using one of Google's offered methods.
2. Create a `sitemap.xml` whose absolute page URLs use the actual published site URL, then add it at the site's root and submit it under **Search Console → Sitemaps**. The final URL is not known until deployment, so do not submit placeholder URLs.
3. Use Search Console's **Performance** report to monitor queries, impressions, clicks, and indexing. Indexing and ranking take time and are not guaranteed.
4. Keep the guides helpful and accurate: explain the steps and limitations, link users to the issuing authority's current notice, and do not publish duplicate pages just to target keyword variations.

The site is not affiliated with any government agency. It does not maintain an authoritative database of application requirements; check the exact official notification or portal before submitting an image.
