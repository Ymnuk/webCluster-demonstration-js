# Демонстрация сессий

Данный пример показывает как могут использоваться сессии на сервере приложений.

## Установка

Перед использованием необходимо выполнить установку модулей:

    npm i

## Хранение сессии в ОЗУ (порт 3000)

    node server1.js

## Хранение сессии в БД (порт 3000)

    node server2.js

## Хранение сессии в БД (порт 3001)

    node server3.js

Данный пример необходимо запускать совместно с server2.js для того, чтобы показать как балансировщик нагрузки может распределять запросы между серверами

## Типовая конфигурация NginX

    #user  nobody;
    worker_processes  1;

    #error_log  logs/error.log;
    #error_log  logs/error.log  notice;
    #error_log  logs/error.log  info;

    #pid        logs/nginx.pid;


    events {
        worker_connections  1024;
    }


    http {
        include       mime.types;
        default_type  application/octet-stream;

        sendfile        on;
        #tcp_nopush     on;

        keepalive_timeout  65;

        gzip  on;

        upstream balancing {
            #ip_hash;
            #hash $remote_addr;
            server localhost:3000;
            server localhost:3001;
        }

        server {
            listen       80;
            server_name  localhost;

            #access_log  logs/host.access.log  main;

            location / {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://balancing/;
            }

            location ~ \.css$ {
                root d:/projects/webCluster/public/;
            }

        }

    }
