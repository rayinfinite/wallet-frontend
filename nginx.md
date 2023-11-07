[官方教程](https://pro.ant.design/zh-CN/docs/deploy/)

## nginx 安装

```bash
sudo apt update
sudo apt install nginx
# 启动Nginx服务
sudo systemctl start nginx
# 开机自启
sudo systemctl enable nginx
```

## 编辑配置

sudo vim nginx.conf 将以下配置项添加到 http {}中

注释# include /etc/nginx/sites-enabled/\*;或写在他前面

```conf
        server {
            listen 80;
            # gzip config
            gzip on;
            gzip_min_length 1k;
            gzip_comp_level 9;
            gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
            gzip_vary on;
            gzip_disable "MSIE [1-6]\.";

            root /var/www/html/dist;

            location / {
                # 用于配合 browserHistory使用
                try_files $uri $uri/index.html /index.html;

                # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验
                # rewrite ^/(.*)$ https://preview.pro.ant.design/$1 permanent;

            }
            location /api {
                rewrite ^/api/(.*) /$1 break;
                proxy_pass http://localhost:9001;
                proxy_set_header   X-Forwarded-Proto $scheme;
                proxy_set_header   X-Real-IP         $remote_addr;
            }
        }
```

将文件放到/var/www/html/dist 中重启 nginx sudo systemctl restart nginx

sudo cat /var/log/nginx/error.log 查看 nginx 日志 sudo truncate -s 0 /var/log/nginx/error.log 清空日志
