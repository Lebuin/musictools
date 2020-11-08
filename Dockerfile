FROM node:15-alpine

WORKDIR /opt/app
COPY ./package*.json ./
RUN npm install \
  && npm cache clean --force --loglevel=error

COPY postcss.config.js tailwind.config.js tsconfig.json webpack.config.js ./
COPY src ./src

EXPOSE 80
USER root

CMD npm start
