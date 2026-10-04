# Car Scroll Animation — React + GSAP

A responsive React recreation of the reference scroll interaction at:
https://paraschaturvedi.github.io/car-scroll-animation/

## Features

- Full-screen sticky/pinned story section
- Horizontal sports-car movement driven by page scroll
- Green progress trail following the car
- Letter-by-letter `WELCOME ITZFIZZ` reveal as the car passes
- Four animated metric cards
- Responsive desktop/tablet/mobile layout
- CSS fallback car if the remote reference image cannot load
- Small progress bar at the top
- Clean React component structure using GSAP + ScrollTrigger

## Stack

- React
- Vite
- GSAP
- ScrollTrigger
- Plain responsive CSS

## Project structure

```text
car-scroll-animation-react/
├── src/
│   ├── components/
│   │   └── CarScrollHero.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Run locally

```bash
npm install
npm run dev
```

Vite will print a local address, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Change the car image

Open `src/components/CarScrollHero.jsx` and replace `CAR_IMAGE` with your own transparent top-view or side/top-view car PNG URL.

For a fully offline project, put an image at `public/car.png` and change:

```js
const CAR_IMAGE = '/car.png';
```

## Customize

- Headline: edit the `headline` constant in `CarScrollHero.jsx`
- Stats: edit the `stats` / stat-card text
- Colors and layout: `src/styles/global.css`
- Scroll length: change `.car-story-section { height: 260vh; }`
- Car speed: shorter section = faster travel; taller section = slower travel

## Deploy

### Vercel

Push the project to GitHub, import it in Vercel, and use the default Vite settings.

### Netlify

Build command: `npm run build`

Publish directory: `dist`
