# Render Deployment Guide

Follow these steps to deploy VisionGuard AI to Render so that it runs exactly like localhost.

## Prerequisites
1. Ensure all your latest changes are pushed to your GitHub repository.
2. Ensure you have an account on [Render.com](https://render.com).

## Blueprint Deployment (Recommended & Automated)
Because we have created a `render.yaml` file, you can deploy both services automatically:

1. Go to your Render Dashboard.
2. Click **New** > **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` configuration.
5. Click **Apply**.
6. Render will begin building both `visionguard-backend` and `visionguard-frontend`.

## Environment Variables Configuration

If you prefer to deploy manually instead of using `render.yaml`, configure the following:

### Backend Service (Web Service -> Docker)
- **Root Directory**: `backend`
- **Build Command**: (Handled by Dockerfile)
- **Start Command**: (Handled by Dockerfile)
- **Environment Variables**:
  - `PORT`: `8080`
  - `SPRING_PROFILES_ACTIVE`: `prod`
  - `FRONTEND_URL`: `https://visionguard-frontend.onrender.com`
  - `JAVA_OPTS`: `-Xmx512m -Xms256m`
  - `PYTHONUNBUFFERED`: `1`

### Frontend Service (Static Site)
- **Root Directory**: `frontend`
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://visionguard-backend.onrender.com/api`
  - `VITE_WS_URL`: `wss://visionguard-backend.onrender.com/ws`

> **Note on Rewrites:** In the Render dashboard for the Frontend static site, go to the **Redirects/Rewrites** section and add a rule:
> Source: `/*` -> Destination: `/index.html` -> Action: `Rewrite`. This ensures React Router works correctly on page refresh.

## Data Persistence (Important)

The backend is configured to use an H2 file database (`./data/visionguard`) and stores uploads in local folders (`./uploads`).
Because Render free instances have an ephemeral file system, this data **will be lost** whenever the server restarts or goes to sleep.

**Future Upgrade:**
When you are ready to persist data, create a PostgreSQL database on Render, then update the backend environment variable:
`SPRING_PROFILES_ACTIVE=future`
And set:
`DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`.
