<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Niroumand Fitness Next.js App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the Next.js 15.3+ `instrumentation-client.ts` pattern. Uses environment variables for the token and host, with a reverse proxy for ingestion, exception capture enabled, and debug mode in development.
- **`next.config.ts`** (updated): Added PostHog reverse proxy rewrites (`/ingest/*` → PostHog US host) and `skipTrailingSlashRedirect: true` to support PostHog's API routing.
- **`.env.local`** (updated): Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/site/ProductView.tsx`** (updated): Added `product_viewed` (on mount), `product_color_selected`, `add_to_cart_clicked`, and `related_product_clicked` events.
- **`components/site/CategoryView.tsx`** (updated): Added `category_filter_changed`, `category_sort_changed`, `product_card_discover_clicked`, and `product_card_configure_clicked` events.
- **`components/site/HeroSwiper.tsx`** (updated): Added `hero_cta_clicked` event with slide index and CTA label properties.
- **`components/site/Header.tsx`** (updated): Added `search_clicked` and `cart_icon_clicked` events.
- **`components/site/Footer.tsx`** (updated): Added `newsletter_subscribe_clicked` and `app_download_clicked` (with `store` property) events.

| Event | Description | File |
|---|---|---|
| `product_viewed` | User viewed a product detail page — top of the conversion funnel | `components/site/ProductView.tsx` |
| `add_to_cart_clicked` | User clicked the Add to Cart button on a product page | `components/site/ProductView.tsx` |
| `product_color_selected` | User selected a color variant on a product page | `components/site/ProductView.tsx` |
| `related_product_clicked` | User clicked on a related product card on the product detail page | `components/site/ProductView.tsx` |
| `category_filter_changed` | User applied a filter in the category product listing | `components/site/CategoryView.tsx` |
| `category_sort_changed` | User changed the sort order in the category product listing | `components/site/CategoryView.tsx` |
| `product_card_discover_clicked` | User clicked 'Discover' on a product card in the category listing | `components/site/CategoryView.tsx` |
| `product_card_configure_clicked` | User clicked 'Configure' on a product card in the category listing | `components/site/CategoryView.tsx` |
| `hero_cta_clicked` | User clicked a hero banner CTA button | `components/site/HeroSwiper.tsx` |
| `cart_icon_clicked` | User clicked the cart icon in the header | `components/site/Header.tsx` |
| `search_clicked` | User clicked the search icon in the header | `components/site/Header.tsx` |
| `newsletter_subscribe_clicked` | User clicked the newsletter subscribe button in the footer | `components/site/Footer.tsx` |
| `app_download_clicked` | User clicked Google Play or App Store download link in the footer | `components/site/Footer.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/411153/dashboard/1548138
- **Product Conversion Funnel** (product_viewed → color_selected → add_to_cart_clicked): https://us.posthog.com/project/411153/insights/DUSXeuC7
- **Add to Cart Clicks Over Time** (daily trend vs product views): https://us.posthog.com/project/411153/insights/b8LzZvaQ
- **Most Engaged Product Categories** (product views broken down by category): https://us.posthog.com/project/411153/insights/bt4DElc9
- **Hero Banner CTAs vs Category Discovery** (hero clicks, filter & sort events): https://us.posthog.com/project/411153/insights/RJUhR4oi
- **Engagement Actions Overview** (cart, search, newsletter, app download clicks): https://us.posthog.com/project/411153/insights/B5Wzsjzb

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
