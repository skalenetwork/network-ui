# Stage 1 - the build process
FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ENV REACT_APP_BASE_PROXY_URL=$REACT_APP_BASE_PROXY_URL
ENV REACT_APP_CHAIN_ID=$REACT_APP_CHAIN_ID

RUN yarn build

RUN yarn global add serve
CMD serve -s build
