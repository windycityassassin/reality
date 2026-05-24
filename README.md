# reality

Mapping India's MMA gym network and prototyping a scout platform on top of it.

## The problem

Indian MMA has talent but no infrastructure for finding it. Scouts and league
operators (think RAW MMA, a planned reality show) have no shared map of where
gyms actually are, who runs them, or how to triage which ones to visit first.

## The approach

Two pieces. First, a pair of Python scripts that turn a CSV of scraped gym
records (name, address, phone, lat/lon, website, Google Maps URL) into
visual outputs: `map_gyms.py` builds an interactive Folium map with
clustered markers and popups, and `simple_map.py` renders a static
matplotlib overlay on top of an India base image with city labels for
hotspots. Second, a React + TypeScript scout app under
`raw_talent_scout_app/` that wraps the gym layer in a workflow UI:
dashboard, fighter database, scouting hub, show manager, analytics. The
app uses Mapbox + react-map-gl for the gym view, MUI for components,
Redux Toolkit for state, and runs on sample data so it's a working
prototype, not a live system.

## What it does

- Plots every gym in `gym_data.csv` on an interactive India map with
  marker clustering, jitter for stacked coordinates, and per-gym popups
  linking out to website and Google Maps.
- Generates a static PNG version of the same map for embedding in
  decks and reports.
- Provides a multi-page scout app with routes for gyms, fighters,
  scouting evaluations, reality-show contestant management, and
  analytics dashboards.
- Lazy-loads pages and uses an Apple-leaning MUI theme defined in
  `src/theme.ts`.

## Run locally

The Python scripts expect a `gym_data.csv` in the repo root with columns
`name, address, phone, website, google_maps_url, latitude, longitude,
city`. That CSV is gitignored. `simple_map.py` additionally needs
`india_map.png` as a base layer.

```bash
pip install pandas folium matplotlib numpy
python map_gyms.py        # writes mma_gyms_india.html
python simple_map.py      # writes mma_gyms_map.png
```

Open `mma_gyms_india.html` in any browser for the interactive map.

The React app:

```bash
cd raw_talent_scout_app
npm install
npm start                 # http://localhost:3000
```

Mapbox views need a token. Set it in a `.env.local` inside
`raw_talent_scout_app/` as `REACT_APP_MAPBOX_TOKEN=...` if you want the
map tiles to render.

## What I learned

- Folium + MarkerCluster handles dense city clusters far better than
  matplotlib scatter, but you still have to jitter exact-duplicate
  coordinates by hand or markers stack and become unclickable.
- Scraping ground-truth small-business data in India is the hard part;
  the visualization layer is trivial once the CSV is clean.
- A scout workflow is mostly CRUD with one good map, not a novel
  algorithm. The product question is what fields to capture, not what
  model to train.
- Lazy-loading React routes with `Suspense` keeps the initial bundle
  small even when each page is 400 to 700 lines of MUI.
- Building the UI shell before there's a backend forces you to commit
  to a data model early. That's useful, but it also means a lot of the
  app is currently wired to sample data.
