FROM node:14

WORKDIR /usr/src/app
COPY . .

EXPOSE 3000
CMD ["sh", "-c", "npm install && node index.js"]