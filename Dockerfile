FROM node:14.17-alpine

RUN mkdir -p /next/ && chown -R node:node /next
WORKDIR /next
COPY --chown=node:node . .

USER node

RUN yarn install --frozen-lockfile
#RUN yarn build

CMD yarn start -p $REACT_PORT