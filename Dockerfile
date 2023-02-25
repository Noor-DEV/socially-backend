# FROM node:18.0-alpine


# WORKDIR /app

# # COPY package.json ./


# COPY . .

# RUN npm install --omit=dev
# USER node

# CMD ["npm","start"]

# EXPOSE 8000

#....................................................
FROM node:lts-alpine

WORKDIR /app

COPY . .
# COPY package*.json ./

# COPY client/package.json client/
# RUN npm run install-client --omit=dev

# COPY server/package.json server/
# RUN npm run install-server --omit=dev
RUN npm install --omit=dev

# COPY client/ client/
# RUN npm run build --prefix client

# COPY server/ server/

USER node

CMD [ "npm", "start" ]

EXPOSE 8000