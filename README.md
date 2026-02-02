# Emily Photography

Static site for Emily Photography. Built as simple HTML/CSS photography site.

Theme: updated to a mauve + blush palette, improved focus outlines for accessibility.

To preview locally:

```bash
python3 -m http.server 8001
# then open http://localhost:8001
```

---

## Hosting & caching recommendations 🔧

- Add the included `_headers` file when deploying to Netlify (or translate to your host) to set long-lived caching for static assets (`/images/*`, `/styles.css`, `/favicon.ico`). ⚠️ Note: GitHub Pages does not allow custom cache headers — set them via your CDN/hosting provider.
- Serve optimized image formats (WebP/AVIF) for production and add responsive `srcset`/`sizes` for gallery images to improve delivery and Lighthouse image suggestions.
- If you use a hosting platform that supports headers (Netlify, Fastly, Cloudflare), apply the cache rules above to reduce repeated bytes served and improve Lighthouse Best Practices.

