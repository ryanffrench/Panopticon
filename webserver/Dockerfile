FROM node:18


WORKDIR /app/webserver

COPY ./webserver/package.json ./webserver/package-lock.json ./
RUN npm install

COPY ./webserver/src ./src
COPY ./webserver/cert ./cert


WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

COPY ./frontend/ .

RUN npm run build

EXPOSE 3000

WORKDIR /app
CMD ["node", "./webserver/src/server.js"]