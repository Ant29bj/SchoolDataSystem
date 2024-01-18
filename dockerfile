FROM node:18 

WORKDIR /SchoolDataSystem

COPY ./project

RUN npm install 

RUN npm run build

EXPOSE 3000

CMD['npm',"run","start"]