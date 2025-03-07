FROM node:18

WORKDIR /usr/src/app

COPY . .


COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh


RUN npm install

RUN npm run build

EXPOSE 4600


CMD ["npm", "start"]
