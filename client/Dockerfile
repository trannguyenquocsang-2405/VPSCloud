FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build React app
RUN npm run build

# Serve bằng serve
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
