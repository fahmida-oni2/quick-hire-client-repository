# QuickHire — Job Board Application

A full-stack job board application built with **React.js** (frontend) and **Node.js/Express** (backend), allowing users to browse, search, filter, and apply for jobs. Admins can post and manage listings through a dedicated admin panel.

## 🔗 Live Links

| | Link |
|---|---|
| **Frontend** | https://quickhire-rho.vercel.app |
| **Backend** | https://quickhire-server-sigma.vercel.app |
| **Server Repository** | https://github.com/fahmida-oni2/quick-hire-server-repository.git |


---

## ✨ Features

### Job Listings
- Browse all available job listings
- Search jobs by title or keyword
- Filter by category (Engineering, Design, Marketing, etc.) and location
- Responsive card grid layout

### Job Detail Page
- Full job description with company, location, and job type
- Apply Now form with name, email, resume link (URL), and cover note
- Real-time form validation

### Admin Panel
- Add new job listings with full details
- Delete existing job listings
- View submitted applications per company

### UI/UX
- Fully responsive — Mobile, Tablet, and Desktop
- Loading skeletons during data fetch
- Clean component structure with reusable components

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | Firebase Authentication |
| Image Upload | ImgBB API |
| Hosting | Vercel (Frontend + Backend) |

---

## 📁 Folder Structure

```
my-react-task-app/               # Frontend
├── src/
│   ├── ApiBaseUrl/              # Base URL config
│   ├── assets/
│   ├── Components/              # Reusable UI components
│   ├── Firebase/                # Firebase config
│   ├── Layouts/                 # Page layouts
│   ├── Pages/
│   │   ├── AllCompanies/
│   │   ├── AllJobs/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   └── JobDetails/
│   ├── Provider/                # Auth context
│   ├── Root/
│   ├── Routes/
│   ├── App.jsx
│   └── main.jsx

quickhire-server/                # Backend
├── index.js                     # Entry point
├── .env                         # Environment variables (not committed)
└── package.json
```

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/jobs` | Get all jobs (supports `?title`, `?location`, `?category`, `?email` filters) |
| GET | `/jobs/:id` | Get single job details |
| POST | `/jobs` | Create a new job |
| DELETE | `/jobs/:id` | Delete a job |
| GET | `/featured-jobs` | Get featured jobs (Design, Marketing, Technology) |
| GET | `/latest-jobs` | Get 8 most recent jobs |
| GET | `/my-jobs?email=` | Get jobs posted by a specific user |
| POST | `/applications` | Submit a job application |
| GET | `/applications` | Get all applications (supports `?company=` filter) |

---

## 🗄️ Data Models

### Job
```json
{
  "_id": "ObjectId",
  "title": "string",
  "company": "string",
  "location": "string",
  "category": "Engineering | Technology | Business | Design | Marketing | Finance | Sales | Human Resources | Other",
  "jobType": "Full Time | Part Time | Remote | Internship | Contract | Freelance",
  "description": "string",
  "postedByEmail": "string",
  "postedByName": "string",
  "created_at": "Date"
}
```

### Application
```json
{
  "_id": "ObjectId",
  "jobId": "string",
  "jobTitle": "string",
  "company": "string",
  "name": "string",
  "email": "string",
  "resumeLink": "string (valid URL)",
  "coverNote": "string",
  "appliedAt": "Date"
}
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Firebase project
- ImgBB account (for image uploads)

---

### 1. Clone the Repositories

```bash
# Frontend
git clone https://github.com/fahmida-oni2/quick-hire-client-repository.git
cd quick-hire-client-repository

# Backend (in a separate terminal)
git clone https://github.com/your-username/quickhire-server.git
cd quickhire-server
```

---

### 2. Backend Setup

```bash
npm install
```

Create a `.env` file in the root of the server:

```env
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
```

Start the server:

```bash
npm start
# Server runs on http://localhost:3000
```

---

### 3. Frontend Setup

```bash
npm install
```

Create a `.env.local` file in the root of the client:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.firebasestorage.app
VITE_messagingSenderId=your_sender_id
VITE_appId=your_firebase_app_id

VITE_IMGBB_API_KEY=your_imgbb_api_key
```

Start the dev server:

```bash
npm run dev
# App runs on http://localhost:5173
```

> Make sure the API base URL in `src/ApiBaseUrl/ApiBaseUrl.js` points to `http://localhost:3000` for local development.

---

## 🌐 Deployment (Vercel)

Both frontend and backend are deployed on **Vercel**.

To add environment variables for the deployed frontend:
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add all `VITE_` prefixed variables from `.env.local`
3. Redeploy

---

## 📌 Notes

- All environment variables are excluded from version control via `.gitignore`
- Input validation is applied on both client and server side
- Resume link must be a valid URL (starting with `http` or `https`)
- Email fields are validated with regex on the server
