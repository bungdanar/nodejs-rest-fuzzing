FROM node:18.17.1

RUN apt-get update ;\
    apt-get install -y tzdata

# Set app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "start:prod"]