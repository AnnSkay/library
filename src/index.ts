import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
// import { DataType } from 'sequelize-typescript';

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

const houses = [
  {
    id: 1,
    title: 'Нет издательства'
  },
  {
    id: 2,
    title: 'РОСМЭН'
  },
  {
    id: 3,
    title: 'Издательство1'
  },
  {
    id: 4,
    title: 'Издательство2'
  },
  {
    id: 5,
    title: 'Издательство3'
  },
  {
    id: 6,
    title: 'Издательство4'
  }
]

const genres = [
  {
    id: 1,
    title: 'Нет жанра'
  },
  {
    id: 2,
    title: 'Фантастика'
  },
  {
    id: 3,
    title: 'Фэнтэзи'
  },
  {
    id: 4,
    title: 'Ужасы'
  },
  {
    id: 5,
    title: 'Комедия'
  },
  {
    id: 6,
    title: 'Сказки'
  }
]

const users = [
  {
    id: 111,
    name: 'Петя',
    lastname: 'Петров',
    login: 'petya@mail.ru',
    password: '123',
    role: 'USER',
    phone: '89991112233'
  },
  {
    id: 222,
    name: 'Вася',
    lastname: 'Васильев',
    login: 'vasya@mail.ru',
    password: '123',
    role: 'LIBR',
    phone: '89112345692'
  },
  {
    id: 333,
    name: 'Федя',
    lastname: 'Федоров',
    login: 'fedya@mail.ru',
    password: '123',
    role: 'ADMIN',
    phone: '89623335823'
  }
]

const books = [
  {
    id: 1,
    title: 'Онегин',
    author: 'Пушкин',
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopies: 2
  },
  {
    id: 2,
    title: 'Война и мир',
    author: 'Толстой',
    houseId: 3,
    genreId: 2,
    year: 1900,
    numberCopies: 1
  },
  {
    id: 3,
    title: 'Капитанская дочка',
    author: 'Пушкин',
    houseId: 2,
    genreId: 1,
    year: 2000,
    numberCopies: 0
  },
  {
    id: 4,
    title: 'Книга1',
    author: 'Пушкин',
    houseId: 1,
    genreId: 5,
    year: 2000,
    numberCopies: 1
  },
  {
    id: 5,
    title: 'Книга2',
    author: 'Пушкин',
    houseId: 5,
    genreId: 3,
    year: 2000,
    numberCopies: 3
  },
  {
    id: 6,
    title: 'Книга3',
    author: 'Пушкин',
    houseId: 2,
    genreId: 2,
    year: 2000,
    numberCopies: 1
  },
  {
    id: 7,
    title: 'Книга4',
    author: 'Пушкин',
    houseId: 2,
    genreId: 2,
    year: 2000,
    numberCopies: 1
  },
  {
    id: 8,
    title: 'Книга5',
    author: 'Пушкин',
    houseId: 4,
    genreId: 4,
    year: 2000,
    numberCopies: 1
  },
  {
    id: 9,
    title: 'Книга6',
    author: 'Пушкин',
    houseId: 1,
    genreId: 3,
    year: 2000,
    numberCopies: 1
  },
  {
    id: 10,
    title: 'Книга7',
    author: 'Пушкин',
    houseId: 1,
    genreId: 4,
    year: 2000,
    numberCopies: 0
  },
  {
    id: 11,
    title: 'Книга8',
    author: 'Пушкин',
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopies: 0
  },
  {
    id: 12,
    title: 'Книга9',
    author: 'Пушкин',
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopies: 0
  },
  {
    id: 13,
    title: 'Книга10',
    author: 'Пушкин',
    houseId: 1,
    genreId: 2,
    year: 2000,
    numberCopies: 1
  }
]

const borrowedBooks = [
  {
    bookId: 2,
    userId: 111,
    dateIssue: new Date(2021, 11, 4, 12, 0, 0),
    dateReturn: new Date(2032, 0, 1)
  },
  {
    bookId: 10,
    userId: 111,
    dateIssue: new Date(2022, 0, 3, 13, 32, 0),
    dateReturn: new Date(2032, 0, 1)
  },
  {
    bookId: 1,
    userId: 111,
    dateIssue: new Date(2022, 0, 2),
    dateReturn: new Date(2022, 0, 3)
  }
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

  const user: any = {}

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

  const booksFilter: any[] = []

  const houseId = (houses.find(house => house.title === ctx.request.body.publishHouse) || {}).id || -1
  const genreId = (genres.find(genre => genre.title === ctx.request.body.genre) || {}).id || -1

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.includes(ctx.request.body.title) &&
        books[i].author.includes(ctx.request.body.author) &&
        (books[i].houseId === houseId || ctx.request.body.publishHouse === '') &&
        (books[i].genreId === genreId || ctx.request.body.genre === '') &&
        (books[i].year === Number(ctx.request.body.publishYear) || ctx.request.body.publishYear === '') &&
        ((books[i].numberCopies > 0 && ctx.request.body.isAvailable === true) || ctx.request.body.isAvailable === false)
    ) {
      booksFilter.push(books[i])

      const houseTitle = (houses.find(house => house.id === books[i].houseId) || {}).title || ''
      const genreTitle = (genres.find(genre => genre.id === books[i].genreId) || {}).title || ''

      booksFilter[booksFilter.length - 1].houseTitle = houseTitle
      booksFilter[booksFilter.length - 1].genreTitle = genreTitle
    }
  }

  ctx.body = booksFilter

  await next()
})

const getDateFormat = (date: any) => {
  let day: any = date.getDate()
  if (day < 10) {
    day = `0${day}`
  }

  let month: any = date.getMonth() + 1
  if (month < 10) {
    month = `0${month}`
  }

  let year: any = date.getFullYear() % 100
  if (year < 10) {
    year = `0${year}`
  }

  let hours: any = date.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }

  let minutes: any = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day}.${month}.${year}г. ${hours}:${minutes}`
}

// отправляет список всех взятых книг
router.get('/api/allBorrowedBooks', async (ctx, next) => {
  console.log('attempt allBorrowedBooks', ctx.request.body)

  const allBorrowedBooks: any[] = []

  for (let i = 0; i < borrowedBooks.length; i++) {
    if (borrowedBooks[i].dateReturn.getTime() > new Date().getTime()) {
      let borrowedBook: any = {}

      const bookInf: any = (books.find(book => book.id === borrowedBooks[i].bookId) || {}) || {}

      borrowedBook.id = bookInf.id
      borrowedBook.title = bookInf.title
      borrowedBook.author = bookInf.author
      borrowedBook. houseId = bookInf. houseId
      borrowedBook.genreId = bookInf.genreId
      borrowedBook.year = bookInf.year

      const houseTitle = (houses.find(house => house.id === bookInf.houseId) || {}).title || ''
      const genreTitle = (genres.find(genre => genre.id === bookInf.genreId) || {}).title || ''

      const dateFormat = getDateFormat(borrowedBooks[i].dateIssue)

      borrowedBook.houseTitle = houseTitle
      borrowedBook.genreTitle = genreTitle
      borrowedBook.dateIssue = borrowedBooks[i].dateIssue
      borrowedBook.dateIssueFormat = dateFormat

      let user: any = (users.find(user => user.id === borrowedBooks[i].userId) || {}) || {};
      borrowedBook.userName = user.name
      borrowedBook.userLastname = user.lastname
      borrowedBook.userEmail = user.login
      borrowedBook.userPhone = user.phone

      allBorrowedBooks.push(borrowedBook)
    }
  }
  ctx.body = allBorrowedBooks

  await next()
})

// отправляет список книг, которые находятся на руках у пользователя, по полученному id пользователя
router.post('/api/borrowedBooksByUser', async (ctx, next) => {
  console.log('attempt borrowedBooksByUser', ctx.request.body)

  const userBorrowedBooks: any[] = []

  for (let i = 0; i < borrowedBooks.length; i++) {
    if (borrowedBooks[i].userId === Number(ctx.request.body.id) &&
       (borrowedBooks[i].dateReturn.getTime() > new Date().getTime())
    ) {
      for (let j = 0; j < books.length; j++) {
        if (books[j].id === borrowedBooks[i].bookId) {
          userBorrowedBooks.push(books[j])

          const houseTitle = (houses.find(house => house.id === books[j].houseId) || {}).title || ''
          const genreTitle = (genres.find(genre => genre.id === books[j].genreId) || {}).title || ''

          const dateFormat = getDateFormat(borrowedBooks[i].dateIssue)

          userBorrowedBooks[userBorrowedBooks.length - 1].houseTitle = houseTitle
          userBorrowedBooks[userBorrowedBooks.length - 1].genreTitle = genreTitle
          userBorrowedBooks[userBorrowedBooks.length - 1].dateIssue = dateFormat
        }
      }
    }
  }

  ctx.body = userBorrowedBooks

  await next()
})

// отправляет список книг по полученному автору
router.post('/api/booksByTitle', async (ctx, next) => {
  console.log('attempt booksByTitle', ctx.request.body)

  const booksByTitle: any[] = []

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.includes(ctx.request.body. searchingBookTitle)) {
      booksByTitle.push(books[i])
    }
  }

  ctx.body = booksByTitle

  await next()
})

// позволяет добавить новую книгу
router.post('/api/addBook', async (ctx, next) => {
  console.log('attempt addBook', ctx.request.body)

  const addingBook: any = {}

  let publishHouseTitle: string = ctx.request.body.publishHouse
  let genreTitle: string = ctx.request.body.genre

  if (!ctx.request.body.publishHouse) {
    if (!ctx.request.body.otherPublishHouse) {
      publishHouseTitle = 'Нет издательства'
    } else {
      const findSameHouse = (houses.find(house => house.title === ctx.request.body.otherPublishHouse) || {}).title || ''

      if (findSameHouse) {
        publishHouseTitle = findSameHouse
      } else {
        const house: any = {}
        house.id = houses[houses.length - 1].id + 1
        house.title = ctx.request.body.otherPublishHouse
        houses.push(house)
        publishHouseTitle = ctx.request.body.otherPublishHouse
      }
    }
  }

  if (!ctx.request.body.genre) {
    if (!ctx.request.body.otherGenre) {
      genreTitle = 'Нет жанра'
    } else {
      const findSameGenre = (genres.find(genre => genre.title === ctx.request.body.otherGenre) || {}).title || ''

      if (findSameGenre) {
        genreTitle = findSameGenre
      } else {
        const genre: any = {}
        genre.id = genres[genres.length - 1].id + 1
        genre.title = ctx.request.body.otherGenre
        genres.push(genre)
        genreTitle = ctx.request.body.otherGenre
      }
    }
  }

  const houseId = (houses.find(house => house.title === publishHouseTitle) || {}).id || ''
  const genreId = (genres.find(genre => genre.title === genreTitle) || {}).id || ''

  for (let i = 0; i < books.length; i++) {
    if (ctx.request.body.title === books[i].title &&
        ctx.request.body.author === books[i].author &&
        houseId === books[i].houseId &&
        genreId === books[i].genreId &&
        Number(ctx.request.body.publishYear) === books[i].year
    ) {
      ctx.body = 'Такая книга уже существует'
      return
    }
  }

  addingBook.id = books[books.length - 1].id + 1
  addingBook.title = ctx.request.body.title
  addingBook.author = ctx.request.body.author
  addingBook.houseId = houseId
  addingBook.genreId = genreId
  addingBook.year = Number(ctx.request.body.publishYear)
  addingBook.numberCopies = Number(ctx.request.body.numberCopies)

  books.push(addingBook)

  ctx.body = 'Книга добавлена'

  await next()
})

// позволяет взять книгу пользователю
router.post('/api/takeBook', async (ctx, next) => {
  console.log('attempt takeBook', ctx.request.body)

  const userTakenBook: any = {}

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
      books[i].numberCopies--
    }
  }

  userTakenBook.bookId = Number(ctx.request.body.bookId)
  userTakenBook.userId = Number(ctx.request.body.id)
  userTakenBook.dateIssue = new Date()
  userTakenBook.dateReturn = new Date(2032, 0, 1)

  console.log(userTakenBook)

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
      books[i].numberCopies++
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

app.listen(3002)
