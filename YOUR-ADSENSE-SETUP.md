# Your AdSense Setup Guide - ca-pub-5649332072305685

## ✅ **Your AdSense Script is Ready!**

I've updated your components with your actual Google AdSense client ID: `ca-pub-5649332072305685`

## 🚀 **Next Steps to Start Earning**

### 1. Create Ad Units in AdSense Dashboard

Go to your Google AdSense dashboard and create these ad units:

**Recommended Ad Units:**

1. **Sidebar Ad** - 300x250 Medium Rectangle
2. **Content Ad** - 336x280 Large Rectangle
3. **Responsive Banner** - Responsive Display

You'll get ad slot IDs like: `1234567890` for each unit.

### 2. Update Your Components

Replace `YOUR_AD_SLOT_ID` in `/client/src/components/AdSense.tsx` with your actual ad slot IDs:

```tsx
export function SidebarAd() {
  return (
    <AdSenseAd
      adSlot="YOUR_ACTUAL_SLOT_ID_HERE" // Replace with real slot ID
      adFormat="vertical"
      style={{ width: "300px", height: "250px" }}
      className="my-4"
    />
  );
}
```

### 3. Add to Your App

Add the AdSense script to your main App component:

```tsx
// In App.tsx, add this import:
import { GoogleAds } from "./components/Analytics";

// In your return statement, add:
<GoogleAds adClientId="ca-pub-5649332072305685" />;
```

### 4. Place Your First Ad

Start with just ONE ad in your sidebar to test:

```tsx
// In your Sidebar component, add:
import { SidebarAd } from "./components/AdSense";

// At the bottom of your sidebar:
<div className="mt-auto p-4 border-t">
  <SidebarAd />
</div>;
```

## 📊 **Expected Revenue for Your Tool**

### Conservative Estimates:

- **Current traffic**: Unknown, but let's estimate
- **Developer audience**: Higher value ads ($3-8 RPM)
- **Tool usage**: Multiple pages per session

### Revenue Scenarios:

```
Monthly Users → Page Views → Revenue
1,000 users  → 10,000 views → $30-80/month
5,000 users  → 50,000 views → $150-400/month
10,000 users → 100,000 views → $300-800/month
```

## 🎯 **Best Placement Strategy for Your MCP Inspector**

### Phase 1: Start Simple

1. **One sidebar ad** below connection settings
2. **Monitor performance** for 30 days
3. **Check user feedback**

### Phase 2: Optimize

1. **Add content ad** after tool results
2. **A/B test placements**
3. **Monitor click-through rates**

### Phase 3: Scale

1. **History panel banner**
2. **Consider premium ad-free option**
3. **Explore developer ad networks**

## 🔧 **Technical Implementation**

### Environment Variables

You can optionally set this in your `.env.local`:

```bash
VITE_GOOGLE_ADS_CLIENT_ID=ca-pub-5649332072305685
```

### Docker Deployment

Make sure to set production environment:

```bash
NODE_ENV=production
```

(Ads only show in production mode)

## ⚠️ **Important Notes**

### AdSense Policies:

- ✅ Don't click your own ads
- ✅ Keep ads clearly marked as advertisements
- ✅ Don't encourage clicks
- ✅ Maintain good user experience

### Performance:

- Ads load asynchronously (won't slow your app)
- Responsive design included
- Ad blockers will hide them (that's normal)

### Monitoring:

- Check AdSense dashboard weekly
- Monitor page load speed
- Watch for policy violations

## 🚀 **Quick Implementation**

1. **Get your ad slot IDs** from AdSense dashboard
2. **Update AdSense.tsx** with real slot IDs
3. **Add GoogleAds component** to App.tsx
4. **Place one SidebarAd** component
5. **Deploy and test** in production

Your AdSense setup is 90% complete! Just need the ad slot IDs from your dashboard and you're ready to start earning!
