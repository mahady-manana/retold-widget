# Retold.me Testimonial Widget

This is the public testimonial widget for Retold.me - a production-ready SaaS platform for collecting and managing customer testimonials.

## Overview

The Retold.me widget allows businesses to embed testimonials on their websites. It fetches and displays testimonials from the Retold.me platform based on the provided configuration.

## Features

- Fetch testimonials from Retold.me API
- Display single or multiple testimonials
- Support for ratings and author information
- Fully responsive design that works on all screen sizes
- Auto-resizing iframe support
- Configurable display options

## Responsive Design

The widget is designed to be responsive and adapt to different screen sizes and embedding contexts:

- Uses flexbox for flexible, responsive layouts
- Adapts to narrow containers (mobile devices, sidebars, etc.)
- Maintains readability on all screen sizes
- Preserves aspect ratios and spacing appropriately
- Hides decorative quote marks on very small screens for better readability

## Easy Embedding with embed.js

The easiest way to embed the widget is using the embed.js script. Simply add a div with the appropriate data attributes and include the script:

```html
<div id="retoldme-widget" data-widget="69884b2803ade5c4248daf7c"></div>
<script src="https://widget.retold.me/embed.js?publishable_key=pk_velCpNQxwX3e1UDSZH8L"></script>
```

### Inline Configuration Options

You can customize the widget appearance using data attributes:

- `data-size`: Number of testimonials to display (default: 3)
- `data-theme`: Theme of the widget (default: light)
- `data-layout`: Layout of testimonials (default: grid)
- `data-show-author-image`: Show author images (default: true)
- `data-show-rating`: Show star ratings (default: true)
- `data-show-date`: Show date information (default: true)
- `data-auto-rotate`: Automatically rotate testimonials (default: false)
- `data-rotation-interval`: Rotation interval in ms (default: 5000)

Example with all options:

```html
<div id="retoldme-widget" 
     data-widget="69884b2803ade5c4248daf7c"
     data-size="5"
     data-theme="dark"
     data-layout="slider"
     data-show-author-image="false"
     data-show-rating="true"
     data-show-date="false"
     data-auto-rotate="true"
     data-rotation-interval="3000">
</div>
<script src="https://widget.retold.me/embed.js?publishable_key=pk_velCpNQxwX3e1UDSZH8L"></script>
```

## API Endpoint

The widget now uses a combined API endpoint that fetches both widget configuration and testimonials in a single request:
`/api/widgets/public/combo/{widgetId}?publishable_key={key}&size={size}&testimonials={ids}`

This reduces the number of API calls from 2 to 1, improving performance and reducing complexity.

## CORS Configuration

Due to CORS (Cross-Origin Resource Sharing) restrictions, the widget may face issues when fetching data from a different domain than the API. To resolve this:

### Option 1: Same Domain Deployment
Deploy the widget on the same domain as the Retold.me API to avoid CORS issues.

### Option 2: Proxy Server
Configure a proxy server to handle API requests:

1. Set the REACT_APP_PROXY_URL environment variable to your proxy endpoint
2. The proxy should forward requests to your Retold.me API

### Option 3: API CORS Headers
Ensure your Retold.me API includes proper CORS headers allowing requests from domains where the widget will be embedded.

## Environment Variables

- REACT_APP_API_BASE_URL: Base URL for the Retold.me API (defaults to http://localhost:3000)
- REACT_APP_PROXY_URL: Optional proxy URL to handle CORS issues

## Development

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Create a .env file with your API configuration:
   ```
   REACT_APP_API_BASE_URL=https://your-api-domain.com
   # REACT_APP_PROXY_URL=https://your-proxy-domain.com  # Optional
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. The widget will be available at http://localhost:5173

## Building for Production

To build the widget for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the dist directory.

## API Integration

The widget integrates with the Retold.me API to:

- Fetch widget configurations and testimonials in a single request
- Handle authentication with publishable keys

## Components

- App.tsx: Main component that handles fetching and displaying testimonials
- App.css: Responsive styles for the testimonial display
- index.css: Base styles for proper embedding
- public/embed.js: Script for easy embedding on any website

## Troubleshooting

### CORS Errors
If you encounter CORS errors:
1. Verify that your API server has proper CORS headers
2. Consider deploying the widget on the same domain as your API
3. Use a proxy server to handle cross-origin requests
4. Check that the Authorization header is properly handled by your API

### Responsive Display Issues
- Ensure the container has sufficient width for the desired layout
- On very narrow screens, testimonial cards will stack vertically
- Quote marks are hidden on screens < 640px for better readability

### Missing Testimonials
- Ensure the widget_id and publishable_key parameters are correctly passed
- Verify that the widget is active and has testimonials assigned to it
- Check that testimonials are published and meet the display criteria

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
