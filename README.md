# 🌐 Social Media Web App (MERN Stack)

This project is a full-stack social media web application developed using the **MERN stack** (MongoDB, Express, React, Node.js) and deployed on **AWS EC2** using **Docker**. It provides a platform where users can share posts, like/unlike posts, follow/unfollow other users, and more.

## 🛠️ Technologies & Infrastructure

**Frontend:**
- React.js, Material-UI, CSS
- React-Router-Dom, Redux

**Backend:**
- Node.js, Express.js
- MongoDB
- REST API, JWT Authentication

**DevOps & Deployment:**
- **Docker & Docker Compose**: Containerization of frontend and backend services.
- **CI/CD**: Pipeline support using **Jenkins** (`Jenkinsfile`) and **GitHub Actions** (`deploy.yml`).
- **AWS EC2**: Production server hosting the application.
- **Docker Hub**: Container image registry.

## 🚀 Features
- **Authentication**: SignUp / Register / Login Pages using JWT.
- **Posts**: Share new posts with text/captions.
- **Interactions**: Like / Unlike posts.
- **Connections**: Follow / Unfollow users. View number of Followers / Following.
- **Feed**: View posts from followed users and react to them. Suggested users list.
- **Profile**: View and update/edit personal profile data.

## 📸 Screenshots

### Authentication
<p float="left">
  <img src="https://github.com/Faizan2911/Social-Media-Web-App-Mern-Stack-/assets/117813967/5b901509-12cc-4e6e-a4e7-ebc21b90a7f2" width="45%" />
  <img src="https://github.com/Faizan2911/Social-Media-Web-App-Mern-Stack-/assets/117813967/4666edc8-5ae0-48b8-8570-9b16106d83ab" width="45%" />
</p>

### Home Page / Feed
<p float="left">
  <img src="https://github.com/Faizan2911/Social-Media-Web-App-Mern-Stack-/assets/117813967/7ff2b394-b96d-4cba-8464-044ecda3076a" width="45%" />
  <img src="https://github.com/Faizan2911/Social-Media-Web-App-Mern-Stack-/assets/117813967/04ab0731-3e2d-40f5-8177-be234366a563" width="45%" />
</p>

### Profile Page
<p float="left">
  <img src="https://github.com/Faizan2911/Social-Media-Web-App-Mern-Stack-/assets/117813967/e4ced6cd-e05d-4a19-8cc2-c952e2c80f3b" width="45%" />
  <img src="https://github.com/Faizan2911/Social-Media-Web-App-Mern-Stack-/assets/117813967/921938ac-e382-4ef5-b6dd-191b85bed1ca" width="45%" />
</p>

## 🚢 CI/CD & Deployment Flow
The application has a fully automated CI/CD pipeline:
1. **Build**: Source code is checked out, and Docker images for the `frontend` and `backend` are built.
2. **Push**: Images are pushed to Docker Hub.
3. **Deploy**: The Jenkins/GitHub Actions pipeline SSHs into the **AWS EC2** instance, pulls the latest code and images, and restarts the containers using `docker-compose`.

## 💻 How to Run Locally

### Option 1: Using Docker (Recommended)
1. Make sure **Docker** and **Docker Compose** are installed.
2. Clone this repository.
3. Run the following command in the root directory:
   ```bash
   docker-compose up -d --build
   ```

### Option 2: Manual Setup
1. Make sure **Node.js** and **MongoDB** are installed and running.
2. Clone this repository.
3. **Frontend**: Navigate to the `/client` folder, run `npm install`, then `npm start`.
4. **Backend**: Navigate to the `/Server` folder, run `npm install`, then `nodemon` (or `npm start`).