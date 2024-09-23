FROM node:22-alpine

RUN npm i -g dotenv-cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx --yes prisma generate

RUN npm run build
