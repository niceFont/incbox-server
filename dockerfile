FROM node:12.18.3-alpine
COPY . /app
WORKDIR /app
RUN apk add --no-cache bash
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
RUN npm run build
RUN cd dist && npm install && cd ..
EXPOSE 3000
CMD [ "node", "dist/bundle.js" ]
