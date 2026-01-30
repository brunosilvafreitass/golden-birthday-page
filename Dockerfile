FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build do Vite
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
