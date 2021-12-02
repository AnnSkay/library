import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors';


const app = new Koa()
const router = new Router()

app.use(bodyParser());
app.use(cors());


const users = [
  {
    name: 'Petya',
    lastname: 'Petrov'
  },
  {
    name: 'Vasya',
    lastname: 'Vasyilev'
  },
  {
    name: 'Fedya',
    lastname: 'Fedorov'
  }
]
router.get('/api/users', async (ctx, next) => {
  ctx.body = users
  await next()
})

router.post(`/api/user`, async (ctx, next) => {
  console.log('attempt user', ctx.request.body)
  for (let i = 0; i < users.length; i++) {
    if (ctx.request.body.name === users[i].name) {
      ctx.body = users[i].lastname
      return
    }
  }
  ctx.body = 'this user was not found'
  await next()
})

router.post('/api/login', async (ctx, next) => {
  console.log('attempt login', ctx.request.body)
  if (ctx.request.body.login === 'petya' && String(ctx.request.body.password) === '123') {
    ctx.body = 'petya'
    return
  }

  if (ctx.request.body.login === 'vasya' && String(ctx.request.body.password) === '123') {
    ctx.body = 'vasya'
    return
  }

  ctx.body = 'failed'
  await next()
})

app.use(router.middleware())


app.listen(3001)