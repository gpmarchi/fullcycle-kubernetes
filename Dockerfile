FROM node:14-alpine
RUN mkdir app
WORKDIR /app
COPY . .
EXPOSE 3333
CMD ["node", "server.js"]