FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 7005

CMD ["/bin/sh", "-c", \
  "if [ ! -d 'src/database/migrations' ]; then npx prisma migrate dev --name init && npx prisma migrate deploy; fi \
  && rm -rf ./out \
  && cp -r /build/out ./out \
  && npm start"]
