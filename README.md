# Task Manager (Vite + React + Firebase)

## Setup

1. Unzip project
2. `npm install`
3. Create a Firebase project and enable Authentication (Email/Password) and Firestore database.
4. Copy your Firebase config into `src/firebase.js` (replace placeholders)
5. `npm run dev`

## Notes
- Tasks are stored in `tasks` collection. Each task document includes `ownerId` (user uid), `title`, `description`, `deadline` (ISO string), `status` (Pending|Completed), and `createdAt`.
- This example uses `SweetAlert2` for quick toasts. Replace with your preferred toast library if needed.
