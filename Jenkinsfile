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
                docker compose build
                '''
            }
        }

        stage('Login & Push to Docker Hub') {
            steps {
                echo "🐳 Logging in and pushing images to Docker Hub..."
                sh '''
                echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin
                docker compose push
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

                    echo '🐳 Pulling latest images...'
                    docker compose pull

                    echo '🛑 Stopping & removing old containers if exist...'
                    docker compose down || true
                    docker rm -f social_frontend social_backend social_mongo || true

                    echo '🧼 Remove unused networks (optional)'
                    docker network prune -f || true

                    echo '🔥 Starting new containers...'
                    docker compose up -d --pull always

                    echo '🧹 Cleaning up old images...'
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
