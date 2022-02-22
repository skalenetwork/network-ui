# Stage 1 - the build process
FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ENV NETWORKS=$NETWORKS
ENV DOCS_WEBSITE_URL=$DOCS_WEBSITE_URL
ENV MAIN_WEBSITE_URL=$MAIN_WEBSITE_URL
ENV NETWORK_NAME=$NETWORK_NAME
ENV CHAIN_ID=$CHAIN_ID
ENV EXPLORER_URL=$EXPLORER_URL
ENV BASE_PROXY_URL=$BASE_PROXY_URL

RUN bash /usr/src/app/prepare_env_file.sh
RUN yarn build

RUN yarn global add serve
CMD serve -l 5001 -s build
