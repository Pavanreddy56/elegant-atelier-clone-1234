# OVAA FASHION - Modern E-Commerce Platform

A modern, premium fashion e-commerce platform inspired by Zara, H&M, and Nykaa design systems.

## Project info

**URL**: https://lovable.dev/projects/e95359cd-626e-42d2-8198-9a1edb695468

## Features

### Customer Features
- **Home/Landing Page** - Hero sections, promotions, featured categories
- **Premium Collections** - Curated premium women's and men's collections
- **Category Listings** - Product lists with filters and sorting
- **Product Details** - Image galleries, variants, pricing, add-to-cart
- **Shopping Cart** - View items, adjust quantities, remove products
- **Checkout** - Address management, shipping options, payment integration
- **Authentication** - Login, register, forgot password flows
- **User Profile** - Order history, saved addresses, account management
- **Search** - Product search with autocomplete
- **Wishlist** - Save favorite items
- **Order Tracking** - View order status and notifications

### Admin Features
- Product management (CRUD operations)
- Order management
- Customer management
- Analytics dashboard

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e95359cd-626e-42d2-8198-9a1edb695468) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn-ui
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## Backend Integration Guide

This project is frontend-ready and can connect to any backend. Choose from these integration options:

### Option 1: Using Lovable Cloud (Recommended - Zero Setup)

**IMPORTANT**: To use Lovable Cloud, enable it through the Lovable editor by clicking the Cloud tab.

After enabling Cloud in your Lovable project, you get instant access to:

**Core Backend Services**
- **PostgreSQL Database**: Fully managed, production-ready
- **Authentication**: Email/password, Google, magic links
- **Storage**: Secure file uploads for product images
- **Edge Functions**: Serverless API endpoints (Deno runtime)
- **Real-time**: WebSocket subscriptions for live updates
- **API Auto-generation**: REST & GraphQL APIs from your schema

**Step-by-Step Setup**

1. **Create Database Tables**

   Go to Cloud > Database > SQL Editor and run:
   ```sql
   -- Products table
   CREATE TABLE products (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     description TEXT,
     price DECIMAL(10,2) NOT NULL,
     category TEXT,
     gender TEXT,
     images JSONB,
     variants JSONB,
     stock INTEGER DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Orders table
   CREATE TABLE orders (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     status TEXT DEFAULT 'pending',
     total DECIMAL(10,2),
     shipping_address JSONB,
     items JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Cart table
   CREATE TABLE cart_items (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     product_id UUID REFERENCES products(id),
     quantity INTEGER DEFAULT 1,
     variant JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Wishlist table
   CREATE TABLE wishlist (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     product_id UUID REFERENCES products(id),
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
   ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

   -- Create policies (example for products - public read)
   CREATE POLICY "Products are viewable by everyone" ON products
     FOR SELECT USING (true);
   ```

2. **Connect Frontend to Backend**

   Install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

   Create `src/integrations/supabase/client.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

   Your environment variables are automatically available when using Lovable Cloud.

3. **Implement Authentication**

   Example login component:
   ```typescript
   import { supabase } from '@/integrations/supabase/client';
   
   const login = async (email: string, password: string) => {
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });
     if (error) throw error;
     return data;
   };
   ```

4. **Fetch Products**

   ```typescript
   const getProducts = async () => {
     const { data, error } = await supabase
       .from('products')
       .select('*')
       .order('created_at', { ascending: false });
     
     if (error) throw error;
     return data;
   };
   ```

5. **Create Edge Functions**

   For custom API logic (e.g., payment processing):

   Create `supabase/functions/create-order/index.ts`:
   ```typescript
   import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
   import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

   serve(async (req) => {
     const supabase = createClient(
       Deno.env.get('SUPABASE_URL') ?? '',
       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
     );

     const { items, user_id } = await req.json();
     
     // Create order logic here
     const { data, error } = await supabase
       .from('orders')
       .insert({ user_id, items, status: 'pending' })
       .select()
       .single();

     return new Response(JSON.stringify(data), {
       headers: { 'Content-Type': 'application/json' },
     });
   });
   ```

   Deploy automatically when you push to GitHub (if connected).

6. **Payment Integration**
   
   Add payment secrets in Cloud > Secrets:
   - `STRIPE_SECRET_KEY` or `RAZORPAY_KEY_SECRET`
   
   Use in edge functions for secure payment processing.

### Option 2: Custom Node.js Backend

Build your own REST API with Node.js and Express. Use this as a prompt for ChatGPT or as implementation guide:

```
Create a Node.js/Express REST API for OVAA FASHION e-commerce with:

1. **Authentication API**
   - POST /api/auth/register - User registration
   - POST /api/auth/login - User login with JWT
   - POST /api/auth/forgot-password - Password reset
   - POST /api/auth/verify-email - Email verification

2. **Products API**
   - GET /api/products - List all products (with filters, pagination)
   - GET /api/products/:id - Get product details
   - POST /api/admin/products - Create product (admin only)
   - PUT /api/admin/products/:id - Update product (admin only)
   - DELETE /api/admin/products/:id - Delete product (admin only)

3. **Cart API**
   - GET /api/cart - Get user's cart
   - POST /api/cart - Add item to cart
   - PUT /api/cart/:id - Update cart item quantity
   - DELETE /api/cart/:id - Remove cart item

4. **Orders API**
   - GET /api/orders - Get user's orders
   - POST /api/orders - Create new order
   - GET /api/orders/:id - Get order details
   - PUT /api/admin/orders/:id - Update order status (admin only)

5. **Wishlist API**
   - GET /api/wishlist - Get user's wishlist
   - POST /api/wishlist - Add to wishlist
   - DELETE /api/wishlist/:id - Remove from wishlist

6. **Search API**
   - GET /api/search - Search products with autocomplete

7. **Payment Integration**
   - POST /api/payment/razorpay/create-order
   - POST /api/payment/razorpay/verify
   - POST /api/payment/stripe/create-intent
   - POST /api/payment/stripe/webhook

8. **Admin API**
   - GET /api/admin/analytics - Dashboard analytics
   - GET /api/admin/customers - Customer management

**Tech Stack:**
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT (access + refresh tokens)
- File Upload: Multer + AWS S3/Cloudinary
- Validation: Joi or Zod
- Rate Limiting: express-rate-limit
- CORS: Configured for frontend origin

**Environment Variables:**
```env
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/ovaa
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
STRIPE_SECRET_KEY=your-stripe-key
AWS_S3_BUCKET=your-bucket
AWS_ACCESS_KEY=your-key
AWS_SECRET_KEY=your-secret
```

**Deployment:** Deploy to Railway, Render, or DigitalOcean
```

**Frontend Integration:**

```typescript
// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = {
  async get(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  },
  
  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

// Usage example
const products = await apiClient.get('/api/products');
const order = await apiClient.post('/api/orders', { items: [...] });
```

### Option 3: Other Backend Services

**Firebase**
```bash
npm install firebase
```
- Firestore for database
- Firebase Auth for authentication
- Cloud Storage for files
- Cloud Functions for serverless APIs

**AWS Amplify**
```bash
npm install aws-amplify
```
- DynamoDB or Aurora for database
- Cognito for authentication
- S3 for storage
- Lambda for serverless functions

**Pocketbase** (Self-hosted)
- Single file backend
- Built-in admin UI
- Real-time subscriptions
- File storage included

**Appwrite** (Self-hosted)
- Open-source Firebase alternative
- Built-in authentication
- Database, storage, and functions
- Docker deployment

## API Integration Examples

### Example: Product Search API

```typescript
// Backend endpoint: GET /api/search?q=dress&category=women&sort=price
export async function searchProducts(query: string, filters: any) {
  const params = new URLSearchParams({
    q: query,
    ...filters
  });
  
  const response = await fetch(`/api/search?${params}`);
  return response.json();
}
```

### Example: Create Order API

```typescript
// Backend endpoint: POST /api/orders
export async function createOrder(orderData: any) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  return response.json();
}
```

## Admin Dashboard

The admin dashboard is accessible at `/admin/dashboard` with these features:

- **Dashboard** (`/admin/dashboard`) - Overview with key metrics
- **Products** (`/admin/products`) - Manage product inventory
- **Orders** (`/admin/orders`) - View and process orders
- **Customers** (`/admin/customers`) - Customer management
- **Analytics** (`/admin/analytics`) - Sales and performance data

**Authentication Required**: Implement admin authentication before production use.

**Backend Requirements:**
- Admin user role management
- Protected API endpoints
- Server-side validation
- Audit logging

## Environment Variables

When using external backends, create environment variables:

**Lovable Cloud**: Variables are auto-configured, no setup needed.

**Custom Backend**: Add to your local development:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Payment Gateways (public keys only)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# External Supabase (if not using Lovable Cloud)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
```

**Security Note**: Never commit `.env` files. Use `.env.example` for templates.

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── assets/           # Images and static files
└── App.tsx           # Main app component
```

## Payment Integration

### Razorpay
1. Sign up at [razorpay.com](https://razorpay.com)
2. Get API keys from dashboard
3. Add keys to environment variables
4. Implement checkout flow using Razorpay SDK

### Stripe
1. Sign up at [stripe.com](https://stripe.com)
2. Get API keys from dashboard
3. Add keys to environment variables
4. Use Stripe Elements for payment forms

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e95359cd-626e-42d2-8198-9a1edb695468) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
