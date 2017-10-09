FROM node:boron
EXPOSE 3000
VOLUME [ "/code" ]
CMD [ "npm", "run", "prod" ]