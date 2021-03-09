FROM node:alpine

WORKDIR /
COPY package.json ./
RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]