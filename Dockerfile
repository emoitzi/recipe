FROM jshimko/meteor-launchpad:latest
RUN mkdir /data
RUN chown node:node /data
