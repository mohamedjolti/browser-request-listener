FROM node:16.20.2-alpine3.18 as build
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source

COPY . .
EXPOSE 8080
CMD [ "npm" ,"run", "build" ]