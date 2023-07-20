FROM postgres:latest

ENV POSTGRES_USER dev
ENV POSTGRES_PASSWORD dev
ENV POSTGRES_DB dev

COPY ./init.sql /docker-entrypoint-initdb.d/