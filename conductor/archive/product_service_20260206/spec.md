# Specification - Product Service Implementation

## Overview
The Product Service is a core microservice responsible for managing the product catalog, categories, and inventory. It allows Vendors to manage their own products and provides public endpoints for Customers to browse and search the catalog. Administrative users can manage categories and perform global catalog maintenance.

## Functional Requirements

### 1. Product Management (Vendor & Admin)
- **Create Product:** Vendors can create new products with fields: `name`, `description`, `price`, `sku`, `stockQuantity`, `categoryId`, `images` (array of URLs), and `isFeatured`.
- **Update Product:** Vendors can edit details of their own products. Admin users can edit any product.
- **Delete Product:** Vendors can remove their own products. Admin users can remove any product.
- **Ownership Verification:** Every write operation must verify that the `vendorId` in the JWT matches the `vendorId` of the product.
- **Automatic Slug Generation:** Generate a unique, URL-friendly `slug` from the product name upon creation.
- **Inventory Validation:** `stockQuantity` must always be zero or greater.

### 2. Category Management (Admin)
- **Manage Categories:** Admins can create, update, and delete categories.
- **Hierarchy support:** Categories support a tree structure via a `parentId` field.

### 3. Catalog Browsing & Search (Public via API Gateway)
- **List Products:** Paginated listing with support for filtering by `categoryId`, `priceRange`, and `vendorId`.
- **Product Detail:** Retrieve full product details using either the unique `id` or `slug`.
- **Search:** Keyword-based search across `name` and `description` using PostgreSQL `ILIKE` filtering.
- **Category Tree:** Fetch the full hierarchical tree of categories or a flat list.

## Non-Functional Requirements
- **Database Isolation:** Use a dedicated `products_db` database within the existing PostgreSQL container.
- **Authentication:** All protected routes must validate JWTs (sharing the verification logic or secret with the Auth Service).
- **Architecture:** Follow the standard microservice structure (Controller -> Service -> Repository/Prisma).

## Acceptance Criteria
- [ ] Product Service successfully connects to `products_db`.
- [ ] API Gateway correctly proxies requests to `/api/v1/products/*`.
- [ ] A Vendor can create, update, and delete only their own products.
- [ ] An Admin can create and manage categories.
- [ ] Public users can search and list products through the Gateway.
- [ ] Validation errors are returned for negative stock or duplicate slugs.

## Out of Scope
- Advanced search engines like Elasticsearch (to be added in a future track).
- Image uploading/hosting (URLs are accepted as strings for now).
- Complex promotional discount engines.
