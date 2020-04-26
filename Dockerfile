FROM node:12.13.0-alpine

ENV NODE_ENV=production
ENV SENTRY_ORG=studio-andy

WORKDIR /app
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*
RUN apk add build-base python
ADD package.json ./
ADD yarn.lock ./
ADD .sentryclirc ./
ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN
ARG RELEASE_VERSION
ARG CTF_SPACE_ID
ARG CTF_CDA_ACCESS_TOKEN

ENV SENTRY_DSN=$SENTRY_DSN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV RELEASE_VERSION=$RELEASE_VERSION
ENV CTF_SPACE_ID=$CTF_SPACE_ID
ENV CTF_CDA_ACCESS_TOKEN=$CTF_CDA_ACCESS_TOKEN

RUN yarn install --frozen-lockfile --production=false
RUN apk del build-base

ADD src ./src
ADD nuxt.config.js ./
ADD tsconfig.json ./
RUN yarn run build
RUN yarn sentry-cli releases set-commits $RELEASE_VERSION --commit "andoshin11/studio-andy@$RELEASE_VERSION"
RUN yarn sentry-cli releases deploys $RELEASE_VERSION new -e $NODE_ENV

CMD ["yarn", "start"]
