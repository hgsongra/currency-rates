# latest official node image
FROM node:14-alpine

# Add curl for healthcheck
RUN apk --update add curl

# Create app directory
RUN mkdir /app

WORKDIR /app

# Copy and install depedencies
COPY package.json /app
COPY package-lock.json /app

RUN npm ci --production

# Bundle app sources
COPY dist/ /app

# Expose necessary port
EXPOSE 3000

# Compile typescript and start app
CMD ["node", "index.js"]
