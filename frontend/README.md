This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

build static html, it will generate the file in the rootPath name `docs`

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

if you want to test it local try the command
```bash
npm install -g serve
serve docs
```

the default upload backend path is `http://localhost:3001/images`
you can search and change in the code 

the upload need a jwt token, you can set in console via localStorege
```javascript
localStorage.setItem('jwt_token', 'your_token_from_backend')
```

## for gitpage
need change the code in page.tsx
```typescirpt
router.push("/result"); => router.push("result.html");
```

and run 
```bash
npm run build
```

<!-- http://127.0.0.1:5500/cxc-web-cam/_next/static/media/e4af272ccee01ff0-s.p.woff2 -->

