# Backend Project Destiny

### JWT (Json Web Token)


<details>
<summary>
DangTH (14/09/2023): Using Redis to develop function Register</summary>
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
DangTH (23/09/2023): Using Redis to develop function Register </summary>
<br>

Data request to `http://localhost:8080/v1/oauth/register` : 

``` js
{
    "email": "user-testgmail.com",
    "name": "NV Test",
    "password": "ytuibj"
}
```

Data response from `http://localhost:8080/v1/oauth/register/authen/{}` (JWT valid for 5 hours): 
```js
{
    "user_id": 0,
    "username": "abuigiueveyu",
    "password": "$2a$10$66aoySQ7FgT8ajDC.uJdde2l8ZJpgLuFRx/5VmBlkuJadMOPBVxS2",
    "fullname": null,
    "email": "user-testgmail.com",
    "intro": null,
    "birthday": null,
    "day_create": "2023-09-22T20:49:29.404+00:00",
    "gender": null,
    "avatar": null,
    "thumb": null,
    "online_last_date": null,
    "mark": 0,
    "user_status": false,
    "ban": false,
    "sub": null,
    "authorities": [
        {
            "authority": "ROLE_USER"
        }
    ],
    "location": null
}
```
</details>
