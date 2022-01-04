import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors';

const app = new Koa()
const router = new Router()

app.use(bodyParser());
app.use(cors());

let houses = [
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

let genres = [
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
  {
    genre: 'Сказки',
  },
]

let users = [
  {
    id: 111,
    name: 'Петя',
    lastname: 'Петров',
    login: 'petya@mail.ru',
    password: '123',
    role: 'USER',
    phone: '89991112233',
  },
  {
    id: 222,
    name: 'Вася',
    lastname: 'Васильев',
    login: 'vasya@mail.ru',
    password: '123',
    role: 'ADMIN',
    phone: '89112345692',
  },
  {
    id: 333,
    name: 'Федя',
    lastname: 'Федоров',
    login: 'fedya@mail.ru',
    password: '123',
    role: 'LIBR',
    phone: '89623335823',
  }
]

let books = [
  {
    id: 1,
    title: 'Онегин',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 2,
    title: 'Война и мир',
    author: 'Толстой',
    house: 'блабла',
    genre: 'Фантастика',
    year: 1900,
    isAvailable: false,
  },
  {
    id: 3,
    title: 'Капитанская дочка',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: false,
  },
  {
    id: 4,
    title: 'Книга1',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 5,
    title: 'Книга2',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 6,
    title: 'Книга3',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 7,
    title: 'Книга4',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 8,
    title: 'Книга5',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 9,
    title: 'Книга6',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 10,
    title: 'Книга7',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 11,
    title: 'Книга8',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 12,
    title: 'Книга9',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
  {
    id: 13,
    title: 'Книга10',
    author: 'Пушкин',
    house: 'РОСМЭН',
    genre: 'Фэнтэзи',
    year: 2000,
    isAvailable: true,
  },
]

let borrowedBooks = [
  {
    bookId: 2,
    userID: 111,
    dateIssue: new Date(2022, 1, 4),
    dateReturn: '',
  },
  {
    bookId: 10,
    userID: 111,
    dateIssue: new Date(2022, 1, 3),
    dateReturn: '',
  },
  {
    bookId: 1,
    userID: 111,
    dateIssue: new Date(2022, 1, 2),
    dateReturn: '',
  },
]

router.get('/api/genres', async (ctx, next) => {
  console.log('attempt genres', ctx.request.body)

  ctx.body = genres

  await next()
})

router.get('/api/houses', async (ctx, next) => {
  console.log('attempt houses', ctx.request.body)

  ctx.body = houses

  await next()
})

router.get('/api/users', async (ctx, next) => {
  console.log('attempt users', ctx.request.body)

  ctx.body = users

  await next()
})

router.post('/api/user', async (ctx, next) => {
  console.log('attempt user', ctx.request.body)

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === Number(ctx.request.body.userId)) {
      ctx.body = users[i]
      return
    }
  }

  ctx.body = 'this user was not found'

  await next()
})

router.post('/api/addUser', async (ctx, next) => {
  console.log('attempt user', ctx.request.body)

  let isNew = true

  for (let i = 0; i < users.length; i++) {
    if (users[i].login === ctx.request.body.email) {
      ctx.body = 'Пользователь с таким email уже существует'
      isNew = false
      return
    }
  }

  if (isNew) {
    let user: any
    user = {}

    user.id = users[users.length - 1].id + 1;
    user.name = ctx.request.body.name
    user.lastname = ctx.request.body.lastname
    user.login = ctx.request.body.email
    user.password = ctx.request.body.password
    user.role = 'USER'
    user.phone = ctx.request.body.phone

    users.push(user)
    ctx.body = `Пользователь с ID: ${users[users.length - 1].id} добавлен`
  }

  await next()
})

router.post('/api/changeUserData', async (ctx, next) => {
  console.log('attempt user', ctx.request.body)
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === Number(ctx.request.body.userId)) {
      users[i].name = ctx.request.body.name
      users[i].lastname = ctx.request.body.lastname
      users[i].login = ctx.request.body.email
      users[i].phone = ctx.request.body.phone

      ctx.body = users[i]
      return
    }
  }

  ctx.body = 'this user was not found'
  await next()
})

router.post('/api/changeUserPassword', async (ctx, next) => {
  console.log('attempt user', ctx.request.body)
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === Number(ctx.request.body.userId)) {
      users[i].password = ctx.request.body.newPassword

      ctx.body = users[i]
      return
    }
  }

  ctx.body = 'this user was not found'
  await next()
})

router.post('/api/books', async (ctx, next) => {
  console.log('attempt books', ctx.request.body)
  let booksFilter: any[]
  booksFilter = []

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.includes(ctx.request.body.title) &&
        books[i].author.includes(ctx.request.body.author) &&
        books[i].house.includes(ctx.request.body.publishHouse) &&
        books[i].genre.includes(ctx.request.body.genre) &&
        (books[i].year === Number(ctx.request.body.publishYear) || ctx.request.body.publishYear === '') &&
        ((books[i].isAvailable === ctx.request.body.isAvailable && ctx.request.body.isAvailable === true) || ctx.request.body.isAvailable === false)
    ) {
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
      ctx.body = users[i].id
      return
    }
  }

  ctx.body = 'failed'
  await next()
})

app.use(router.middleware())

app.listen(3001)