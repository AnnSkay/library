import Koa from 'koa'

const app = new Koa()

app.use(async (ctx: any) => {
  ctx.body = "123"
  // await next()
})

app.listen(3000)