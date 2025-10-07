FROM node:18-alpine

WORKDIR /app

# Copy package và cài deps
COPY package*.json ./
RUN npm install

# Copy toàn bộ source
COPY . .

EXPOSE 8080

# CMD để chạy server
CMD ["npm", "start"]
