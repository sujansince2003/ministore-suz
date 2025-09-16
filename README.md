# Suzz Store - Mini Online Store

A small, clean, and responsive storefront built with Next.js and TypeScript. This project showcases a product catalog fetched from the FakeStore API, with rich filtering, sorting, cart management, and accessible UI components powered by Tailwind CSS and Zustand state management.

***

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [State Management & Data Flow](#state-management--data-flow)
- [Known Issues & Trade-offs](#known-issues--trade-offs)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

***

## Demo

Visit the live demo: [https://ministore-suz.vercel.app](https://ministore-suz.vercel.app) 

***


## Demo ScreenShots

### Product Catalog(Light)

<img src="https://i.postimg.cc/76GHNBHW/Screenshot-2025-09-16-at-6-03-34-PM.png" alt="Product Catalog light screenshot" >

### Product Catalog(dark)
<img src="https://i.postimg.cc/Nf7gb2tB/Screenshot-2025-09-16-at-6-03-42-PM.png" alt="Product Catalog dark screenshot" >

### Product Detail

<img src="https://i.postimg.cc/RFHmtNGr/Screenshot-2025-09-16-at-6-04-20-PM.png" alt="Product Detail screenshot" >

### Product Cart
<img src="https://i.postimg.cc/g2tbBvTF/Screenshot-2025-09-16-at-6-04-41-PM.png" alt="Product Cart screenshot" >




***

## Architecture

- **`app/`** - Next.js App Router folder with page components for catalog, product details, and cart.
- **`actions/products.ts`** - Server actions for fetching products and categories from the FakeStore API.
- **`components/general/`** - Reusable UI components: Header, ProductCard, CartItem, Filters, ProductDetail, etc.
- **`components/ui/`** - Base UI primitives: Button, Card, Input, Select, Checkbox, Sheet, Skeleton.
- **`store/cartStore.ts`** - Zustand store managing cart state with persistence.
- **`lib/`** - Utility functions for filtering, formatting, and classnames merging.
- **`types/`** - TypeScript type definitions for products, cart items, and filter state.
- **Styling** - Implemented with Tailwind CSS and shadcn/ui themes; supports dark mode and responsive design.

<img src="https://i.postimg.cc/RFj8xdcy/suzzstore-architecure.png" alt="architecture diagram" >


## Lighthouse Performance Score

### Lighthouse Performance Score (Mobile)

<img src="https://i.postimg.cc/RZ5HJHRm/Screenshot-2025-09-16-at-6-11-09-PM.png" alt="Lighthouse Performance Score (Mobile)" >

### Lighthouse Performance Score (Desktop)
<img src="https://i.postimg.cc/QCcWfN8w/Screenshot-2025-09-16-at-6-13-00-PM.png" alt="Lighthouse Performance Score (Desktop)" >







***
## Features

### Catalog (/)
- Responsive grid display of products: image, title, price, category.
- Filter by multiple categories, price range, and search by title (debounced).
- Sort products by price (low to high or high to low).
- Loading skeletons while data fetches.
- Handles empty and error states gracefully.
- Pagination with selectable items per page.

### Product Detail (/product/[id])
- Shows large product images, title, description, category, price.
- Add to cart button with stock check (disabled if out of stock).
- Displays related products by category.
- SEO friendly meta tags and Open Graph data.

### Cart (/cart)
- Displays cart line items with image, title, unit price, quantity controls.
- Remove items and update quantities.
- Order summary with total price and shipping info.
- Cart state persisted in localStorage for session persistence.
- Accessible and responsive design.

### Additional Features
- Dark mode toggle supporting system preferences.
- Toast notifications on adding products to cart.
- Accessible UI components with semantic HTML and ARIA labels.
- Fully typed with TypeScript for type safety.
- Clean and modular folder and file structure.

***

## Tech Stack

- **Framework:** Next.js 15 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI components
- **State Management:** Zustand with persistence middleware
- **API:** FakeStore API
- **UI:** Tailwind,Shadcn,Lucide Icons
- **Toast Notifications:** react-hot-toast
- **Deployment:** Vercel and Oracle VPS with Coolify

***

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/ministore.git
cd ministore
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

### Building for Production

```bash
npm run build
npm start
```



## State Management & Data Flow

- Product and category data are fetched on the server and passed to client components.
- Filtering, searching, sorting, and pagination are managed in the `ProductsWrapper` component on the client side.
- Cart state is managed with Zustand, stored in localStorage to persist between sessions.
- Add to cart actions trigger toast notifications using `react-hot-toast`.
- Theme toggling (dark/light) uses `next-themes`.
- All inputs and controls include accessibility attributes for semantic interaction.

***

## Known Issues & Trade-offs

- The app relies on the FakeStore public API, so network latency or availability may affect user experience.
- Minimal backend caching beyond Next.js cache policies; adding a dedicated backend or caching layer can improve scalability.
- Product stock is based on the FakeStore API's rating count, which is limited as a stock proxy.

***

## Deployment

Deployed on :
Vercel
Oracle VPS (Coolify)


***

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

***

## License

This project is licensed under the MIT License.



