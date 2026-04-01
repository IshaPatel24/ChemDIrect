# ChemDirect Search Engine

ChemDirect is a vertical search engine specifically designed for chemical, organic, and inorganic synthesis products. It is built to cut through SEO clutter, whitepapers, and blogs, providing users with direct, verifiable, and transactional "buy links" to procured chemicals.

## 🚀 Key Features

*   **Transactional Focus Algorithm:** The search engine is designed to filter out non-buyable items (like articles and whitepapers) to give users direct access to purchasable products.
*   **Smart Comparison Tools:** Allows users to easily add products to a comparison view to quickly analyze price-per-unit, purity grades, and vendors side-by-side.
*   **Quality Assurance & Verifiable Data:** Products are indexed with their CAS Numbers, exact purity grades, and standardized branding.

## 🛠️ Tech Stack

This project is built using modern web development standards and a high-performance frontend architecture:

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **UI Library:** React 19
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Language:** TypeScript
*   **Utilities:** `clsx`, `tailwind-merge`, and `class-variance-authority` (for component variant management)

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js (version 20 or higher) and npm installed on your machine.

### Installation

1.  Clone the repository and install the dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## 🔍 Usage Guide & Examples

The application is currently wired to a local mock database (`lib/data.ts`) to demonstrate its search and filtering logic.

### 1. Basic Search
Navigate to the homepage and use the search bar. You can search by:
*   **Chemical Name:** e.g., `"Methanol"` or `"Ethanol"`
*   **CAS Number:** e.g., `"67-56-1"` (CAS for Methanol)

### 2. The Transactional Filter in Action
**Example Query:** `"Methanol"`
*   **Expected Behavior:** You will see results for "Methanol, HPLC Grade" and "Methanol, Reagent Grade" because they have valid pricing and are purchasable. 
*   **Filtered Out:** A mock object named *"Synthesis of Methanol: A Review"* (Price: 0) exists in the database. Notice that it does **not** appear in your search results. This perfectly demonstrates the `filterTransactionalResults` utility keeping the results clear of clutter.

### 3. Dynamic Filtering
On the Results Page (`/results`), use the left sidebar to dynamically refine your search:
*   **Purity Grade:** Filter by `99.9%`, `99.5%`, etc.
*   **Manufacturer:** Filter by vendors like `Sigma-Aldrich` or `Thermo Fisher`.

### 4. Side-by-Side Comparison
1.  Search for `"Methanol"`.
2.  On the results page, click the **"Compare"** button on multiple products.
3.  Click the **"Compare (X)"** button that appears in the top navigation bar to be taken to a standardized comparative view where you can analyze costs and units together.

## 📁 Directory Structure

*   **/app:** Contains the Next.js App Router definitions.
    *   `page.tsx`: The Hero / Landing view with the main search bar.
    *   `/results/page.tsx`: The primary search results page with sidebar filters.
    *   `/compare/page.tsx`, `/about/`, `/contact/`, `/products/`: Secondary application routes.
*   **/components:** Reusable React components (e.g., `ComparisonTable.tsx`, `PharmaLoader.tsx`).
*   **/lib:** Core business logic and data layer.
    *   `data.ts`: Contains `MOCK_PRODUCTS` array for testing.
    *   `types.ts`: TypeScript interfaces defining the `Product` schema.
    *   `utils.ts`: Filtering algorithms (`filterTransactionalResults`) and tailwind aggregators (`cn`).
*   `schema.sql`: Database table structures proposed for future production deployment.
