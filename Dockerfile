FROM amazonlinux:2.0.20190228

# Install epel (to allow yum)
RUN amazon-linux-extras install epel
RUN yum -y update

# Install tar
RUN yum install -y tar.x86_64 xz

# Install Node
ENV NODE_VERSION 8.10.0

ENV NODE_DIR /usr/local/node
ENV NODE_PATH $NODE_DIR/v$NODE_VERSION
ENV PATH $NODE_PATH/bin:$PATH

RUN mkdir $NODE_DIR
RUN curl https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz | tar -xJ -C $NODE_DIR
RUN mv $NODE_DIR/node-v$NODE_VERSION-linux-x64 $NODE_PATH

# Install AWS CLI
RUN yum install -y python3
RUN python3 -m pip install awscli

# Clean up
RUN yum clean all

# Set defaults
ENV PORT 80
EXPOSE 80
WORKDIR /opt/vue-lambda
CMD ["npm", "start"]
