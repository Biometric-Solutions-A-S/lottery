# Run backend + frontend

This repository has two apps:
- `backend` (ASP.NET Core, .NET 10)
- `frontend` (Vue 3 + Vite)

## Prerequisites

- .NET SDK 10.x
- Node.js 22+ (recommended for this project)
- npm

## 1) Start the backend

Open a terminal at the repository root, then run:

```bash
cd backend
dotnet restore
dotnet run dev
```

Backend URL:
- `http://localhost:5091`

## 2) Start the Vue app

Open a second terminal at the repository root, then run:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:
- `http://localhost:5090`

## Notes

- Keep both terminals running while developing.
- The frontend API client is configured to call `http://localhost:5091`, so the backend should be running on that URL.
