FROM node:18-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . .

CMD ["node", "./src/index.js"]
