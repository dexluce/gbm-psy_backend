## development
FROM node:12 As development
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN nest build
## production
FROM node:12 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]