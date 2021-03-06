This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Prisma Setup

1. VS Code 에 Prisma extension 설치

2. Prisma 설치

```sh
$ yarn add -D prisma
```

3. 프로젝트에 Prisma 설정

```sh
$ npx prisma init
(or yarn prisma init)
```

아래와 같이 두 파일이 생성됨

> prisma/schema.prisma : 데이터베이스 연결 및 Prisma 클라이언트 생성기가 있는 Prisma schema
> .env : 환경 변수를 정의하기 위한 dotenv 파일

schema.prisma 에서는 아래 3가지를 설정할 수 있다.

- Data source: 데이터베이스를 연결
- Generator: Prisma Client를 생성
- Data model: 애플리케이션의 모델(데이터베이스 테이블)을 정의

## PlanetScale

pscale 사용을 위해 아래와 같이 설치한다.

macOS

```sh
$ brew install planetscale/tap/pscale
$ brew install mysql-client

// 설치후 아래 명령어로 잘 설치되었는지 확인
$ pscale
```

### 로그인

```sh
pscale auth login
```

- region 확인(slug 확인 for 데이터베이스 생성)

```sh
$ pscale region list
```

### database 생성

```sh
$ pscale database create carrot-market --region ap-northeast
```

https://app.planetscale.com/elle0510 에서 생성된 database 확인

### pscale connect

로컬과 PlanetScale 사이에 암호없이 보안 연결(secure tunnel)을 한다.

```sh
$ pscale connect carrot-market
```

연결된 console 을 닫지 않는다.

출력된 정보로

.env 파일의 DATABASE_URL 설정을 해준다.

### db push

```sh
$ npx prisma db push
```

참고로 @prisma/client 가 설치됨
https://app.planetscale.com/elle0510/carrot-market/main/schema
에서 schema 확인(최초 push 시는 User Model)

### prisma studio

```sh
$ npx prisma studio
```

http://localhost:5555/ 웹페이지로 자동 이동됨

### prisma client 설치

위에서 db push 할 때 설치됨(만약 안되었다면 수동으로 설치)

```sh
$ yarn add @prisma/client
```
