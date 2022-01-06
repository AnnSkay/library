import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors';
// import { DataType } from 'sequelize-typescript';

const app = new Koa()
const router = new Router()

app.use(bodyParser());
app.use(cors());

let houses = [
  {
    id: 1,
    title: 'РОСМЭН',
  },
  {
    id: 2,
    title: 'Издательство1',
  },
  {
    id: 3,
    title: 'Издательство2',
  },
  {
    id: 4,
    title: 'Издательство3',
  },
  {
    id: 5,
    title: 'Издательство4',
  },
];

let genres = [
  {
    id: 1,
    title: 'Фантастика',
  },
  {
    id: 2,
    title: 'Фэнтэзи',
  },
  {
    id: 3,
    title: 'Ужасы'
  },
  {
    id: 4,
    title: 'Комедия',
  },
  {
    id: 5,
    title: 'Сказки',
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
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopyes: 2,
  },
  {
    id: 2,
    title: 'Война и мир',
    author: 'Толстой',
    houseId: 3,
    genreId: 2,
    year: 1900,
    numberCopyes: 1,
  },
  {
    id: 3,
    title: 'Капитанская дочка',
    author: 'Пушкин',
    houseId: 2,
    genreId: 1,
    year: 2000,
    numberCopyes: 0,
  },
  {
    id: 4,
    title: 'Книга1',
    author: 'Пушкин',
    houseId: 1,
    genreId: 5,
    year: 2000,
    numberCopyes: 1,
  },
  {
    id: 5,
    title: 'Книга2',
    author: 'Пушкин',
    houseId: 5,
    genreId: 3,
    year: 2000,
    numberCopyes: 3,
  },
  {
    id: 6,
    title: 'Книга3',
    author: 'Пушкин',
    houseId: 2,
    genreId: 2,
    year: 2000,
    numberCopyes: 1,
  },
  {
    id: 7,
    title: 'Книга4',
    author: 'Пушкин',
    houseId: 2,
    genreId: 2,
    year: 2000,
    numberCopyes: 1,
  },
  {
    id: 8,
    title: 'Книга5',
    author: 'Пушкин',
    houseId: 4,
    genreId: 4,
    year: 2000,
    numberCopyes: 1,
  },
  {
    id: 9,
    title: 'Книга6',
    author: 'Пушкин',
    houseId: 1,
    genreId: 3,
    year: 2000,
    numberCopyes: 1,
  },
  {
    id: 10,
    title: 'Книга7',
    author: 'Пушкин',
    houseId: 1,
    genreId: 4,
    year: 2000,
    numberCopyes: 0,
  },
  {
    id: 11,
    title: 'Книга8',
    author: 'Пушкин',
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopyes: 0,
  },
  {
    id: 12,
    title: 'Книга9',
    author: 'Пушкин',
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopyes: 0,
  },
  {
    id: 13,
    title: 'Книга10',
    author: 'Пушкин',
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopyes: 1,
  },
]

let borrowedBooks = [
  {
    bookId: 2,
    userId: 111,
    dateIssue: new Date(2021, 11, 4, 12, 0, 0),
    dateReturn: new Date(2032, 0, 1),
  },
  {
    bookId: 10,
    userId: 111,
    dateIssue: new Date(2022, 0, 3, 13, 32, 0),
    dateReturn: new Date(2032, 0, 1),
  },
  {
    bookId: 1,
    userId: 111,
    dateIssue: new Date(2022, 0, 2),
    dateReturn: new Date(2022, 0, 3),
  },
]

// отправляет список жанров для раскрывающего списка поиска книг
router.get('/api/genres', async (ctx, next) => {
  console.log('attempt genres', ctx.request.body)

  ctx.body = genres

  await next()
})

// отправляет список издательств для раскрывающего списка поиска книг
router.get('/api/houses', async (ctx, next) => {
  console.log('attempt houses', ctx.request.body)

  ctx.body = houses

  await next()
})

// получение списка всех пользователей (тестовый запрос, нигде не используется)
// router.get('/api/users', async (ctx, next) => {
//   console.log('attempt users', ctx.request.body)

//   ctx.body = users

//   await next()
// })

// отправляет данные пользователя по полученному id
router.post('/api/user', async (ctx, next) => {
  console.log('attempt user', ctx.request.body)

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === Number(ctx.request.body.id)) {
      ctx.body = users[i]

      return
    }
  }

  ctx.body = 'this user was not found'

  await next()
})

// добавляет пользователя в базу при регистрации по полученным данным из полей ввода
router.post('/api/addUser', async (ctx, next) => {
  console.log('attempt addUser', ctx.request.body)

  for (let i = 0; i < users.length; i++) {
    if (users[i].login === ctx.request.body.email) {
      ctx.body = 'Пользователь с таким email уже существует'

      return
    }
  }

  let user: any
  user = {}

  user.id = users[users.length - 1].id + 1
  user.name = ctx.request.body.name
  user.lastname = ctx.request.body.lastname
  user.login = ctx.request.body.email
  user.password = ctx.request.body.password
  user.role = 'USER'
  user.phone = ctx.request.body.phone

  users.push(user)

  ctx.body = `Пользователь с ID: ${users[users.length - 1].id} добавлен`

  await next()
})

// изменяет личные данные пользователя
router.post('/api/changeUserData', async (ctx, next) => {
  console.log('attempt changeUserData', ctx.request.body)

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

// изменяет пароль пользователя
router.post('/api/changeUserPassword', async (ctx, next) => {
  console.log('attempt changeUserPassword', ctx.request.body)

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

// поиск книг по полученному фильтру
router.post('/api/books', async (ctx, next) => {
  console.log('attempt books', ctx.request.body)

  let booksFilter: any[]
  booksFilter = []

  let houseId = (houses.find(house => house.title === ctx.request.body.publishHouse) || {}).id || -1
  let genreId = (genres.find(genre => genre.title === ctx.request.body.genre) || {}).id || -1

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.includes(ctx.request.body.title) &&
        books[i].author.includes(ctx.request.body.author) &&
        (books[i].houseId === houseId || ctx.request.body.publishHouse === '') &&
        (books[i].genreId === genreId || ctx.request.body.genre === '') &&
        (books[i].year === Number(ctx.request.body.publishYear) || ctx.request.body.publishYear === '') &&
        ((books[i].numberCopyes > 0 && ctx.request.body.isAvailable === true) || ctx.request.body.isAvailable === false)
    ) {
      booksFilter.push(books[i])

      let houseTitle = (houses.find(house => house.id === books[i].houseId) || {}).title || ''
      let genreTitle = (genres.find(genre => genre.id === books[i].genreId) || {}).title || ''

      booksFilter[booksFilter.length - 1].houseTitle = houseTitle
      booksFilter[booksFilter.length - 1].genreTitle = genreTitle
    }
  }

  ctx.body = booksFilter

  await next()
})

// отправляет список книг, которые находятся на руках у пользователя, по полученному id пользователя
router.post('/api/borrowedBooks', async (ctx, next) => {
  console.log('attempt borrowedBooks', ctx.request.body)

  let userBorrowedBooks: any[]
  userBorrowedBooks = []

  for (let i = 0; i < borrowedBooks.length; i++) {
    if (borrowedBooks[i].userId === Number(ctx.request.body.id) &&
       (borrowedBooks[i].dateReturn.getTime() > new Date().getTime())
    ) {
      for (let j = 0; j < books.length; j++) {
        if (books[j].id === borrowedBooks[i].bookId) {
          userBorrowedBooks.push(books[j])

          let houseTitle = (houses.find(house => house.id === books[i].houseId) || {}).title || ''
          let genreTitle = (genres.find(genre => genre.id === books[i].genreId) || {}).title || ''

          let day, month, year, hours, minutes: any

          day = borrowedBooks[i].dateIssue.getDate()
          if (day < 10) {
            day = `0${day}`
          }

          month = borrowedBooks[i].dateIssue.getMonth() + 1
          if (month < 10) {
            month = `0${month}`
          }

          year = borrowedBooks[i].dateIssue.getFullYear() % 100
          if (year < 10) {
            year = `0${year}`
          }

          hours = borrowedBooks[i].dateIssue.getHours();
          if (hours < 10) {
            hours = `0${hours}`
          }

          minutes = borrowedBooks[i].dateIssue.getMinutes();
          if (minutes < 10) {
            minutes = `0${minutes}`
          }

          userBorrowedBooks[userBorrowedBooks.length - 1].houseTitle = houseTitle
          userBorrowedBooks[userBorrowedBooks.length - 1].genreTitle = genreTitle
          userBorrowedBooks[userBorrowedBooks.length - 1].dateIssue = `${day}.${month}.${year}г. ${hours}:${minutes}`
        }
      }
    }
  }

  ctx.body = userBorrowedBooks

  await next()
})

// позволяет взять книгу пользователю
router.post('/api/takeBook', async (ctx, next) => {
  console.log('attempt takeBook', ctx.request.body)

  let userTakenBook = {
    bookId: 0,
    userId: 0,
    dateIssue: new Date(),
    dateReturn: new Date()
  }

  for (let i = 0; i < borrowedBooks.length; i++) {
    if (borrowedBooks[i].bookId === Number(ctx.request.body.bookId) &&
        borrowedBooks[i].userId === Number(ctx.request.body.id) &&
        borrowedBooks[i].dateReturn.getTime() > new Date().getTime()) {
          ctx.body = 'Эта книга уже была взята Вами'

          return
        }
  }

  for (let i = 0; i < books.length; i++) {
    if (books[i].id === Number(ctx.request.body.bookId)) {
          books[i].numberCopyes --
        }
  }

  userTakenBook.bookId = Number(ctx.request.body.bookId)
  userTakenBook.userId = Number(ctx.request.body.id)
  userTakenBook.dateIssue = new Date()
  userTakenBook.dateReturn =  new Date(2032, 0, 1)

  borrowedBooks.push(userTakenBook)

  ctx.body = 'Книга взята'

  await next()
})

// позволяет вернуть взятую книгу
router.post('/api/returnBook', async (ctx, next) => {
  console.log('attempt returnBook', ctx.request.body)
  for (let i = 0; i < borrowedBooks.length; i++) {
    if (borrowedBooks[i].bookId === Number(ctx.request.body.bookId) &&
        borrowedBooks[i].userId === Number(ctx.request.body.id)) {
          borrowedBooks[i].dateReturn = new Date()
        }
  }

  for (let i = 0; i < books.length; i++) {
    if (books[i].id === Number(ctx.request.body.bookId)) {
          books[i].numberCopyes ++
        }
  }

  ctx.body = borrowedBooks

  await next()
})

// осуществляет вход пользователя по логину и паролю
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