# FCD-BACKEND

Backend resources for full code development MNote.
Tugas Akhir Gagah Aji Gunadi 1301204093 Fakultas Informatika Telkom University


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV` -> string to define stage ("development" or "production")

`MONGO_URI` -> for development stage

`MONGO_URI_PROD` -> for production stage

`PORT` -> port for the server

`SECRET_KEY` - > string for jsonwebtoken
## API Reference

## USER - Authentication

#### Signup

```http
  POST /auth/signup
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. your name |
| `email` | `string` | **Required**. your email |
| `password` | `string` | **Required**. your password |

#### Signin

```http
  POST /auth/signin
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. your email |
| `password` | `string` | **Required**. your password |


## USER - Orders

#### Dashboard / add order
```http
  POST /orders/order
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `ObjectId` | **Required**. user's id|
| `name` | `string` | **Required**. order name |
| `amount` | `number` | **Required**. order amount in number |

#### Dashboard / get all orders / today orders
```http
  POST /orders
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `ObjectId` | **Required**. user's id|

#### Dashboard / delete an order
```http
  DELETE /orders/:orderId/:userId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `ObjectId` | **Required**. order's id|
| `userId` | `ObjectId` | **Required**. user's id|


#### Summary / get order on selected date
```http
  POST /orders/summary
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | **Required**. date in format "dd-mm-yyyy"|
| `userId` | `ObjectId` | **Required**. user's id|


#### Search / get order by name
```http
  POST /orders/search
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. the order's name


#### Search / get order by name
```http
  POST /orders/detail
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `ObjectId` | **Required**. order's id|

## USER - User related
#### fetch user / get user detail
```http
  POST /user
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `ObjectId` | **Required**. user's id|


#### decode token / get user information based on token provided
```http
  POST /user/decode
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token with format "jwt {your token}"|


#### Settings / change user information
```http
  PUT /user/settings
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `ObjectId` | **Required**. user's id from mongodb ObjectId|
| `name` | `string` | **Required**. user's name|
| `email` | `string` | **Required**. user's new email|
| `newPassword` | `string` | **Optional**. user's new password if want to|


#### Help / fetch help data
```http
  GET /help
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |


## ADMIN - Authentication

#### Login 
```http
  POST /api/admin/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. admin's email|
| `password` | `string` | **Required**. admin's password|

## ADMIN - Manage users

#### get all users
```http
  GET /api/admin/users
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |


#### delete user
```http
  DELETE /api/admin/users
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `ObjectID` | **Required**. user's id to be deleted|


## ADMIN - manage orders
#### get all orders from all users
```http
  GET /api/admin/orders
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|


#### get all orders from one user
```http
  POST /api/admin/orders
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `ObjectID` | **Required**. user's id to get the orders of|


#### delete all orders
```http
  DELETE /api/admin/orders
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|


#### add order price
```http
  POST /api/admin/orders/price
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. order's name|
| `price` | `number` | **Required**. order's price|


#### get all order price
```http
  GET /api/admin/orders/price
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|


#### get one order price
```http
  GET /api/admin/orders/order/price
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. order's name|


#### edit one order price
```http
  PUT /api/admin/orders/price/:orderId
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `ObjectId` | **Required**. order's id|

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `price` | `number` | **Required**. order's price|

## ADMIN - Manage Help
#### add help data
```http
  POST /help
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `question` | `string` | **Required**. Help's question|
| `answer` | `string` | **Required**. Help's answer|

#### delete all help data
```http
  DELETE /help
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|


#### delete one help data
```http
  DELETE /help/:helpId
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. jwt token in format "jwt {token}"|

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `helpId` | `ObjectId` | **Required**. Helps' id to be deleted|

## Authors

- [@aggagah](https://www.github.com/aggagah)


## License

[MIT](https://choosealicense.com/licenses/mit/)

