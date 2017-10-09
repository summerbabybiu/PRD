FROM node:boron
EXPOSE 3000
VOLUME [ "/code" ]
COPY entry.sh /
RUN chmod +x entry.sh
CMD [ "./entry.sh" ]