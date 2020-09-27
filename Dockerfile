FROM tozd/meteor:ubuntu-xenial-1.4.4.2
#RUN node /opt/meteor/dist/bundle/programs/server/node_modules/fibers/build
RUN mkdir /data
RUN chown meteor:meteor /data
