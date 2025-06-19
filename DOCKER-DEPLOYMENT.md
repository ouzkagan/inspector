# Digital Ocean Docker Deployment Guide

## Pre-Deployment Checklist

### 1. Required Files

Ensure these SEO files are created before building:

- [ ] `/client/public/og-image.jpeg` (1200x630px)
- [ ] Convert `/client/public/mcp.svg` to favicon formats
- [ ] Update environment variables

### 2. Docker Build Command

```bash
# Build with SEO files included
docker build -t onlinemcpinspector .

# Test locally first
docker run -p 6274:6274 -p 6277:6277 \
  -e CANONICAL_URL=https://onlinemcpinspector.com \
  onlinemcpinspector
```

### 3. Digital Ocean App Platform Configuration

```yaml
# app.yaml for Digital Ocean App Platform
name: onlinemcpinspector
services:
  - name: web
    source_dir: /
    github:
      repo: your-username/oguz-inspector
      branch: main
    run_command: npm start
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs
    envs:
      - key: NODE_ENV
        value: production
      - key: CLIENT_PORT
        value: "6274"
      - key: SERVER_PORT
        value: "6277"
      - key: CANONICAL_URL
        value: "https://onlinemcpinspector.com"
      - key: VITE_GA_MEASUREMENT_ID
        value: "your-ga-id"
        type: SECRET
      - key: VITE_GOOGLE_ADS_CLIENT_ID
        value: "your-ads-id"
        type: SECRET
    http_port: 6274
    routes:
      - path: /
```

## SEO-Specific Deployment Considerations

### 1. Static File Serving

Ensure Vite serves these files correctly:

- `/robots.txt` → should be accessible at `onlinemcpinspector.com/robots.txt`
- `/sitemap.xml` → should be accessible at `onlinemcpinspector.com/sitemap.xml`
- `/og-image.jpeg` → for social media sharing

### 2. Environment Variables

```bash
# Production environment
NODE_ENV=production
CANONICAL_URL=https://onlinemcpinspector.com

# Analytics (when ready)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GOOGLE_ADS_CLIENT_ID=ca-pub-XXXXXXXXXX
```

### 3. Domain & SSL

- Ensure SSL certificate is configured (Digital Ocean handles this)
- Set up custom domain pointing to your DO app
- Update DNS records properly

### 4. Performance Monitoring

After deployment, check:

- Page load speed: `https://pagespeed.web.dev/`
- SEO validation: `https://www.seoptimer.com/`
- Social media cards: `https://developers.facebook.com/tools/debug/`

## Deployment Commands

```bash
# 1. Build and test locally
docker build -t onlinemcpinspector .
docker run -p 6274:6274 -p 6277:6277 onlinemcpinspector

# 2. Push to Digital Ocean Container Registry
doctl registry login
docker tag onlinemcpinspector registry.digitalocean.com/your-registry/onlinemcpinspector
docker push registry.digitalocean.com/your-registry/onlinemcpinspector

# 3. Deploy via DO App Platform or Droplet
```

## Post-Deployment SEO Setup

1. **Google Search Console**

   - Add property for `onlinemcpinspector.com`
   - Submit sitemap: `onlinemcpinspector.com/sitemap.xml`

2. **Test SEO Elements**

   ```bash
   curl -I https://onlinemcpinspector.com/robots.txt
   curl -I https://onlinemcpinspector.com/sitemap.xml
   curl -I https://onlinemcpinspector.com/og-image.jpeg
   ```

3. **Monitoring Setup**
   - Google Analytics (when ready)
   - Uptime monitoring
   - Performance monitoring
