FROM node:9.3.0-alpine

COPY ./opt /opt

WORKDIR /opt

RUN npm install

CMD /opt/node_modules/typescript/bin/tsc --watch
