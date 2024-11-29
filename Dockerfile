FROM node:18-slim

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
