FROM node:14.17.6
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
CMD ["node","dist/main"]