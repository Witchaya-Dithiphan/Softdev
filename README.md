# Dormitory Management Prototype

A Thai-language dormitory management frontend built with React 19, TypeScript, Vite 8, and Tailwind CSS 4. Includes screens for caretakers, owners, tenants, and repair staff.

## Requirements

- Node.js 22.12 or newer (Node.js 22 is configured in `.mise.toml`).
- pnpm 10; the project toolchain specifies pnpm 10.34.3.
- Git.

If pnpm is not installed:

```sh
npm install --global pnpm@10.34.3
```

## Run locally

```sh
git clone https://github.com/Witchaya-Dithiphan/Softdev.git
cd Softdev
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://localhost:8443**. The app redirects to `/login`. Source changes reload automatically.

No environment variables, database, or backend service are required to run this prototype. Keep `.figma/make/site.json`: it is imported by the Vite configuration.

If port 8443 is already in use, choose another port:

```sh
pnpm dev --port 5173
```

Then open http://localhost:5173. When working inside Figma Make, use its existing development server and preview panel.

On Windows PowerShell, if script execution policy blocks npm or pnpm, use `npm.cmd` and `pnpm.cmd` instead (for example, `pnpm.cmd dev`).

## Demo login accounts

| Role | Email | Password |
| --- | --- | --- |
| Caretaker / ผู้ดูแลหอ | caretaker@demo.com | 1234 |
| Owner / เจ้าของหอ | owner@demo.com | 1234 |
| Tenant / ผู้พักอาศัย | tenant@demo.com | 1234 |
| Repair staff / ช่างซ่อม | repairman@demo.com | 1234 |

You can also click a demo account on the login screen to fill its credentials.

## Build and check

```sh
# Type-check the project
pnpm exec tsc --noEmit

# Create a production build in dist/
pnpm build

# Preview the build locally
pnpm preview
```

Preview also uses port 8443 by default. Stop the development server first, or run `pnpm preview --port 4173` and open http://localhost:4173.

`pnpm format` runs the configured oxfmt formatter. No automated test script is currently configured.

## Project structure

```text
src/
  main.tsx              React entry point
  App.tsx               Application routes
  index.css             Global styles and fonts
  components/           Shared layout, sidebar, and dialogs
  context/AuthContext.tsx Demo authentication
  pages/                Caretaker and owner pages; login and registration
    tenant/             Tenant pages
    repairman/          Repair staff pages
public/assets/          Images and icons
.figma/make/             Figma Make configuration and helper scripts
vite.config.ts          Vite, Tailwind, and Figma integration
```

## Prototype behavior

- Authentication uses hardcoded demo accounts and React state; refreshing requires logging in again.
- Registration and password recovery are UI demonstrations. They do not create accounts or send email/SMS.
- Repair requests and borrowing interactions use local component state and reset when the page is left or refreshed.
- Other screens contain sample data, and some controls are visual placeholders. There is no persistent backend or synchronization between roles.
- Fonts are loaded from Figma's hosted font URLs, so matching the original typography requires internet access.

For deployment, serve the generated `dist/` folder with a static host configured to rewrite application routes to `index.html` (the app uses `BrowserRouter`). Production authentication, persistence, and messaging must be implemented separately.
