FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=12345
ENV MYSQL_DATABASE acai_bh
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=123456

COPY mysql01-farm10_kinghost_net.sql /docker-entrypoint-initdb.d/

EXPOSE 3306