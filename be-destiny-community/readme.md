# Backend Project Destiny

### JWT (Json Web Token)


<details>
<summary>
DangTH (14/09/2023): Using JWT to project with account from DB and password encoded</summary>
<br>

Data request to `http://localhost:8080/oauth/login` : 

``` js
{
    "email": "dangthpc04349@fpt.edu.vn",
    "password": "dangth"	// password before encode
}
```

Data response from `http://localhost:8080/oauth/login` (JWT valid for 5 hours): 
```js
{
    "name": "Trần Hữu Đang",
    "roles": [
        {
            "authority": "ROLE_ADMIN"
        }
    ],
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW5ndGhwYzA0MzQ5QGZwdC5lZHUudm4iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImV4cCI6MTY5NDY1MjU5M30.-V11gKKHmUAgqJNMWZ-1qwHx_tSAT7xvyaCwhn87OBI",
    "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW5ndGhwYzA0MzQ5QGZwdC5lZHUudm4iLCJleHAiOjE2OTQ2NTI1OTN9.8RYyL9LXwhdKxPZf2GlsudErkNIqSLMhBy8ONsjQHFk"
}
```
</details>


<details>
<summary>
DangTH (18/09/2023): Using Redis reduce amount Request period</summary>
<br>

## Cài đặt 

[Redis Windows](https://github.com/dangth12/redis) 

## chạy

```redis
redis-cli 
127.0.0.1:6379> ping
PONG
```

## Tắt Server

`Ctrl + C` hoặc chạy lệnh sau

```redis
redis-cli shutdown
```
</details>

<details>
<summary>
VinhPQ (19/09/2023): Add a row in entity Interested</summary>
<br>
</details>
