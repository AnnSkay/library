import Koa from 'koa'

const app = new Koa()

app.use(async (ctx: any) => {
  ctx.body = {str: 123}
  // await next()
})

app.listen(3002)