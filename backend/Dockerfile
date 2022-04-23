FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ENV PORT=5000
EXPOSE 5000
CMD ["npm", "run", "start"]