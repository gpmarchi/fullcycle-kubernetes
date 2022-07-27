FROM node:14-alpine
RUN mkdir app
WORKDIR /app
COPY . .
RUN yarn --production
EXPOSE 3333
CMD ["node", "server.js"]