First of all, the first step when I received the test was to read the instructions and try to understand the objective. I usually take a look at the code and how it is structured. I performed the following steps sequentially.

1 - I first uploaded the project to Git to have an overview of the commits and tasks completed.

2 - I followed the initial steps to run the project, which included installing dependencies, initializing the database, and starting the development server as outlined in the project instructions.

3 - I improved the visualization of the vehicle listing in Frontend, I added a table for better visualization.

4 - Soon after, I created additional filters, passing each parameter to the API as requested in the readme.

5 - I made a change to the pagination, adding filtering by the number of items per page.

6 - After completing the previous steps, I started to isolate the logic of each component, that is, separating the JSX from the functions that involve logic, respecting a SOLID principle of single responsibility.

7 - Then I restructured the routes folder and some folders to organize the project.

# Project structure
app/
│
├── App.tsx
│
├── components/
│   ├── ErrorFallback.tsx
│   ├── MiniPageLayout.tsx
│   ├── VehicleDetails.tsx
│   ├── search/
│   │   ├── AdditionalFilters/
│   │   │   ├── AdditionalFilters.tsx
│   │   │   └── useAdditionalFilters.ts
│   │   ├── PaginationControls/
│   │   │   ├── PaginationControls.tsx
│   │   │   └── usePaginationControls.ts
│   │   ├── TimeRangeFilters.tsx
│   │   └── VehicleList/
│   │       ├── VehicleList.tsx
│   │       └── useVehicleList.ts
│   │
│   └── ui/
│       
│
├── lib/
│   └── classnames.ts
│
├── pages/
│   └── SearchPage/
│       └── Schema.ts
│
└── services/
    └── trpc/
        └── client.ts