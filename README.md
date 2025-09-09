# Button Pressing Challenge

## Description
- ButtonPress is a small, full-stack web application where authenticated users can press a button to increase a click counter. Counts are stored and updated per user in Firestore.

## Features
- React frontend with Firebase Auth (email/password)
- Firestore data persistency: tracks button press counts per user
- Minimal Node.js backend deploy to Cloud Run (for echo/protected API route)
- Firebase Hosting for the frontend
- Live URLs are provided below ⬇️

## Setup Instructions
1. Clone the repo 
  ```bash
  git clone https://github.com/JahleelT/ButtonPress.git
  cd ButtonPress
  ```
2. Install Dependencies
    1. Frontend
        ```bash
        cd frontend
        npm install
        ```
    2. Backend
        ```bash
        cd backend #(../backend if in frontend directory)
        npm install
        ```
3. Environment Variables
  Create an `.env` file in `frontend/env` 
    ```bash
    VITE_FIREBASE_API_KEY = api_key
    VITE_FIREBASE_AUTH_DOMAIN = auth_domain
    VITE_FIREBASE_PROJECT_ID = project_id
    VITE_FIREBASE_STORAGE_BUCKET = storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID = sender_id
    VITE_FIREBASE_APP_ID = app_id
    VITE_FIREBASE_MEASUREMENT_ID = measurement_id
    VITE_API_URL = api_url
    ```
4. Local Development
   1. Frontend
    ```bash
    cd frontend
    npm run dev
    ```
   2. Backend
    ```bash
    cd backend
    npm run dev
    ```
5. Deployment
   1. Frontend
      ```bash 
      firebase deploy --only hosting
      ```
   2. Backend
      ```bash
      gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/button-backend
      gcloud run deploy button-backend --image gcr.io/YOUR_PROJECT_ID/button-backend --platform managed
      ```
6. Live URLs
   1. **Frontend:** https://buttonpress-2dc06.web.app
   2. **Backend:** https://backend-service-989215811929.us-central1.run.app


## Security Notes
- **Authentication:** All Firestore reads/writes are scoped to the currently signed-in user via Firebase Auth
- **Firestore Rules:** Each user can only access their own document:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {

      // Only allow users to access their own document
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }

      // Deny all other access
      match /{document=**} {
        allow read, write: if false;
      }
    }
  }
  ```
- **Backend Protection:** Cloud Run API validates Firebase ID tokens on protected routes. Only authenticated requests with a valid bearer token are allowed.
- **Principle of Least Privilege:** No public write access, no shared docs; everything tied to a UID.

