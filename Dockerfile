FROM --platform=linux/amd64 node:16.3.0-alpine AS BUILD_IMAGE

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# Set to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/

COPY ./package.json  ./
COPY ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
COPY . .
RUN yarn install
RUN yarn run build

FROM --platform=linux/amd64 node:16.3.0-alpine
WORKDIR /opt/
COPY --from=BUILD_IMAGE /opt/build ./build
COPY --from=BUILD_IMAGE /opt/config ./config
COPY --from=BUILD_IMAGE /opt/database ./database
COPY --from=BUILD_IMAGE /opt/public ./public
COPY --from=BUILD_IMAGE /opt/src ./src
COPY --from=BUILD_IMAGE /opt/node_modules ./node_modules
COPY --from=BUILD_IMAGE /opt/package.json .

LABEL com.centurylinklabs.watchtower.enable="true"

EXPOSE 1337
CMD ["yarn", "run", "start"]