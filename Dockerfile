FROM node:18-alpine

WORKDIR /home/sekai/workspace/cecsin/SchoolDataClient/

COPY public/ /home/sekai/workspace/cecsin/SchoolDataClient/
COPY src/ /home/sekai/workspace/cecsin/SchoolDataClient/
COPY package.json /home/sekai/workspace/cecsin/SchoolDataClient/
COPY .env /home/sekai/workspace/cecsin/SchoolDataClient/

RUN npm install

CMD ["npm", "run", "start"]
