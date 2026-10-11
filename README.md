# 🌶️ CrunchyCraft — Frontend Web Experience

The complete client-side application for the **CrunchyCraft Cinematic Food & Snack Experience**.

## Tech Stack
* **Framework**: React 19, Vite, TypeScript
* **Styling**: Tailwind CSS, PostCSS
* **Animation & 3D**: GSAP, GSAP ScrollTrigger, Three.js, CSS 3D Perspective Transforms
* **Interactions**: Framer Motion, Canvas Confetti
* **Icons**: Lucide React
* **Analytics Visualization**: Recharts
* **Acoustics**: Web Audio API (procedural crunch generator)

## Folder Structure
```
frontend/
├── src/
│   ├── assets/           # High-detail product and ingredient SVG artwork
│   ├── components/
│   │   ├── cinematic/    # Hero, ScandalousCrunch, Pinned showcase, Flavors, BrandStory, FinalCTA
│   │   ├── layout/       # Navbar, Footer, CartDrawer, SearchDrawer
│   │   └── shop/         # ProductCard, QuickViewModal
│   ├── data/             # Products dataset with nutrition & flavor profiles
│   ├── hooks/            # useCart, useAuth
│   ├── lib/              # Procedural crunch audio engine
│   ├── pages/            # Home, Shop, Details, Checkout, Orders, Profile, Admin
│   ├── types/            # TypeScript data models
│   ├── App.tsx           # Main application shell
│   ├── main.tsx          # React DOM entrypoint
│   └── index.css         # Tailwind & film-grain overlay
├── public/               # Static assets
├── index.html            # HTML template with Google Fonts
├── package.json          # Frontend dependencies and scripts
├── tailwind.config.js    # Tailwind color tokens and keyframes
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

## Running the Frontend

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
