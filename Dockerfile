# Stage 1 - the build process
FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

RUN bash /usr/src/app/prepare_env_file.sh
RUN yarn build

RUN yarn global add serve
CMD serve -l 5001 -s build
