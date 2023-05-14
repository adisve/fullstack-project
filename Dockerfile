# Build client
FROM node:14 AS client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Move client build to server directory
FROM node:14.17.5 AS server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npm run build
COPY --from=client /app/client/dist ./frontend-dist

# Run server
EXPOSE 7036
CMD [ "npm", "start" ]