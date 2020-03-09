FROM node:10.17.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm update
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start:docker" ]
