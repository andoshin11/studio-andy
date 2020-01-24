FROM node:12.13.0-alpine

ENV NODE_ENV=development
ENV SENTRY_ORG=studio-andy

WORKDIR /app
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*
RUN apk add jq build-base python
ADD package.json ./
ADD yarn.lock ./
ADD .sentryclirc ./
ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN
ARG RELEASE_VERSION
ARG CTF_SPACE_ID
ARG CTF_CDA_ACCESS_TOKEN
RUN yarn install --frozen-lockfile --production=false
RUN apk del build-base

ADD src ./src
ADD nuxt.config.js ./
ADD tsconfig.json ./
RUN yarn run build
# RUN yarn sentry-cli releases set-commits $RELEASE_VERSION --commit "Photocreate/client.snapsnap.jp@$RELEASE_VERSION"
# RUN yarn sentry-cli releases deploys $RELEASE_VERSION new -e $NODE_ENV

# TODO: Prepare for production
# RUN yarn remove $(cat package.json | jq -r '.devDependencies | keys | join(" ")')
# RUN cd app && ls . | egrep -v '^static$' | xargs rm -r
RUN rm ./tsconfig.json
RUN rm ./yarn.lock

CMD ["yarn", "start"]
