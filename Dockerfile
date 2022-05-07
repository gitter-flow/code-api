FROM node:alpine3.14
ARG PORT

USER root
WORKDIR /home/app

COPY package.json .
COPY tsconfig.json .

RUN npm install &&\
    mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

USER 1234

ENV HOST=0.0.0.0
ENV PORT=${PORT}
EXPOSE ${PORT}
ENTRYPOINT [ "npm" ]
CMD ["run", "start-dev"]