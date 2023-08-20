![](Assets/kagoj.jpg)

# KagOJ

## How to start

#### Installation

At first clone this repository by

`git clone https://github.com/TamimEhsan/KagOJ.git`
The backend only runs in linux environment. So either open with ubuntu, or if you are in windows use wsl

#### Start Backend

Then go into `Kagoj/Kagoj Backend`

create a `.env` file. And populate with the followings

```
PORT=3005
DATABASE_URL=DATABASE_URL
DATABASE_URL_LOCAL=DATABASE_URL_LOCAL
JWT_SECRET=JWT_SECRET
OS_PASS=OS_PASS
```

and install dependencies and then start node server

```
npm i
npm run dev
```

#### Start Frontend

Then go into `Kagoj/Kagoj Frontend`

and install dependencies and then start node server.

```
npm i --force
npm start
```
