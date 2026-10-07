# NITA Smart Workplace

A responsive React landing page scaffolded with Vite, Tailwind CSS, and Lucide React, based on the supplied Smart Workplace dashboard PDF and recommendations document.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Start the project

1. Extract the ZIP and open a terminal in this project folder.
2. Run `npm install` to install the packages and generate `package-lock.json`.
3. Run `npm run dev` and open the local URL printed by Vite.

Use `npm run build` to create a production build, `npm run preview` to preview it, and `npm run lint` to check the source.

## Project structure

```text
public/                 Static public assets
src/
  assets/               NITA logo, Barlow fonts, hero photo, and news image
  components/            Shared navigation and footer
  pages/                 Home, About, Contact, Projects, Services
  services/              Open-Meteo forecast API client for Accra
  App.css                Shared component styling
  App.jsx                Page routing and notifications
  index.css              Tailwind import and font setup
  main.jsx               React entry point
index.html               Vite HTML entry point
vite.config.js           React and Tailwind Vite plugins
eslint.config.js         ESLint configuration
package.json             Dependencies and scripts
```

Lucide React supplies the consistent line icons used in the navigation, modules, service cards, weather, and page actions.

The main service links are frontend prototype actions that need to be connected to NITA systems. Accra weather is fetched live from Open-Meteo, refreshes every 15 minutes, and displays current conditions, humidity, wind, and today's temperature range. A retry option appears if the feed is unavailable.
