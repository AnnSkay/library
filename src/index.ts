import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors';


const app = new Koa()
const router = new Router()

app.use(bodyParser());
app.use(cors());

const houses = [
  {
    house: 'РОСМЭН',
  },
  {
    house: 'Издательство1',
  },
  {
    house: 'Издательство2',
  },
  {
    house: 'Издательство3',
  },
  {
    house: 'Издательство4',
  },
];

const genres = [
  {
    genre: 'Фантастика',
  },
  {
    genre: 'Фэнтэзи',
  },
  {
    genre: 'Ужасы'
  },
  {
    genre: 'Комедия',
  },
  {genre: 'Сказки',
  },
]

const users = [
  {
    name: 'Петя',
    lastname: 'Петров',
    login: 'petya@mail.ru',
    password: '123',
  },
  {
    name: 'Вася',
    lastname: 'Васильев',
    login: 'vasya@mail.ru',
    password: '123',
  },
  {
    name: 'Федя',
    lastname: 'Федоров',
    login: 'fedya@mail.ru',
    password: '123',
  }
]

const books = [
  {
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Война и мир',
    author: 'Толстой',
    house: 'блабла',
    genre: 'Фантастика',
    year: 1900,
    isAvailable: false,
  },
  {
    title: 'Капитанская дочка',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: false,
  },
  {
    title: 'Книга1',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Книга2',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Книга3',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },{
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
]

router.get(`/api/genres`, async (ctx, next) => {
  console.log('attempt genres', ctx.request.body)
  ctx.body = genres
  await next()
})

router.get(`/api/houses`, async (ctx, next) => {
  console.log('attempt genres', ctx.request.body)
  ctx.body = houses
  await next()
})

router.get('/api/users', async (ctx, next) => {
  console.log('attempt users', ctx.request.body)
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

router.post(`/api/books`, async (ctx, next) => {
  console.log('attempt books', ctx.request.body)
  let booksFilter: any[];
  booksFilter = [];

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.includes(ctx.request.body.bookTitle) &&
        books[i].author.includes(ctx.request.body.bookAuthor) &&
        books[i].house.includes(ctx.request.body.bookPublishHouse) &&
        books[i].genre.includes(ctx.request.body.bookGenre) &&
        (books[i].year === Number(ctx.request.body.bookPublishYear) ||  ctx.request.body.bookPublishYear === '') &&
        (books[i].isAvailable === ctx.request.body.bookIsAvailable && ctx.request.body.bookIsAvailable === true || ctx.request.body.bookIsAvailable === false)
       )
    {
      booksFilter.push(books[i])
    }
  }

  ctx.body = booksFilter

  await next()
})

router.post('/api/login', async (ctx, next) => {
  console.log('attempt login', ctx.request.body)
  for (let i = 0; i < users.length; i++) {
    if (ctx.request.body.login === users[i].login &&
        ctx.request.body.password === users[i].password) {
          ctx.body = users[i].login
          return
    }
  }

  ctx.body = 'failed'
  await next()
})

app.use(router.middleware())


app.listen(3001)
