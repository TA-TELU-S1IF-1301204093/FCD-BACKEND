FROM node:18-alpine

WORKDIR /be-mnote

COPY . .

RUN npm install

CMD ["node", "index"]

EXPOSE 50150