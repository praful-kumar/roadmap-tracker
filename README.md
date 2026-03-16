# Roadmap Tracker (Standalone Angular)

## Overview

A standalone-component Angular app for tracking learning progress using a JSON roadmap structure.  
Supports:

- Importing roadmap JSON via file upload
- Keeping task completion state in `localStorage`
- Dashboard with overall, weekly, and topic progress
- Sidebar navigation by week/day
- Dynamic route-driven pages: `/` (dashboard), `/roadmap`

## Project structure

- `src/main.ts` - bootstraps with router and `AppComponent`
- `src/app/app.component.ts` - root component, checks for roadmap data and renders layout
- `src/app/header/` - header + summary progress
- `src/app/sidebar/` - week/day navigation
- `src/app/dashboard/` - progress cards
- `src/app/roadmap/` - roadmap view
- `src/app/week/`, `src/app/day/`, `src/app/task/` - nested task list components
- `src/app/upload-roadmap/` - JSON upload + prompt helper
- `src/app/services/roadmap.service.ts` - roadmap and config signals
- `src/app/services/progress.service.ts` - completion state, totals, weekly/topic summaries
- `src/app/services/storage.service.ts` - localStorage persistence
- `src/app/config/roadmap.config.ts` - default roadmap skeleton (task data)

## Features

- Persistent task completion state
- Adaptive computed signals:
  - `totalTasks`, `completedTasks`, `remainingTasks`
  - `percentComplete`
  - `weeklyProgress`, `topicProgress`
- Upload custom roadmap JSON and refresh app
- Config JSON schema:
  - `config.title`, `config.goal`
  - `roadmap[]` with `week`, `focus`, `days[]`, `tasks[]`
- `TaskComponent` toggles status through `ProgressService.toggle(key, checked)`

## Run

```bash
npm install
ng serve