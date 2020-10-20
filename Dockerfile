FROM tozd/meteor:ubuntu-xenial-1.11.1

RUN mkdir /data
RUN chown meteor:meteor /data
