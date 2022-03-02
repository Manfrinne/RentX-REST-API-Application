# Imagem obtida no "hub.docker.com", ver outras opções depois.
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . . 

EXPOSE 3333

CMD ["npm","run","dev"]