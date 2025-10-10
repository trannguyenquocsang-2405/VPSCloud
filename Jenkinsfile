pipeline {
    agent any

    environment {
        // 🔹 Docker Hub credential (Username with password)
        DOCKER_HUB = credentials('docker-hub')
        
        // 🔹 SSH Key to EC2
        SERVER_SSH_KEY = credentials('server-ssh-key')

        // 🔹 Host EC2
        SERVER_HOST = '43.207.201.56'
        SERVER_USERNAME = 'ubuntu'

        // 🔹 Docker Hub repo name
        DOCKER_USERNAME = 'marubouzo'
    }

    stages {
        stage('Checkout source code') {
            steps {
                echo "📦 Checking out source code..."
                checkout scm
            }
        }

        stage('Build Docker images') {
            steps {
                echo "🧱 Building Docker images..."
                sh '''
                # Build backend
                docker build -t $DOCKER_USERNAME/social-media-backend:latest ./Server

                # Build frontend
                docker build -t $DOCKER_USERNAME/social-media-frontend:latest ./client
                '''
            }
        }

        stage('Push images to Docker Hub') {
            steps {
                echo "🐳 Logging in & pushing images to Docker Hub..."
                sh '''
                echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin

                docker push $DOCKER_USERNAME/social-media-backend:latest
                docker push $DOCKER_USERNAME/social-media-frontend:latest
                '''
            }
        }

        stage('Deploy to EC2 Server') {
            steps {
                echo "🚀 Deploying to EC2..."
                sshagent (credentials: ['server-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${SERVER_USERNAME}@${SERVER_HOST} "
                    set -e
                    echo '📂 Moving to project directory...'
                    mkdir -p ~/social-media
                    cd ~/social-media

                    echo '📥 Pulling latest code...'
                    if [ -d .git ]; then
                        git checkout main || true
                        git pull origin main || true
                    else
                        git clone https://github.com/marubouzo/social-media.git . || true
                    fi

                    echo '🐳 Pulling latest images from Docker Hub...'
                    docker pull $DOCKER_USERNAME/social-media-backend:latest
                    docker pull $DOCKER_USERNAME/social-media-frontend:latest

                    echo '🛑 Stopping old containers...'
                    docker compose down || true

                    echo '🔥 Starting new containers...'
                    docker compose up -d

                    echo '🧹 Cleaning old images...'
                    docker image prune -f
                    "
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "🧼 Cleanup..."
            sh 'docker logout || true'
        }
    }
}
