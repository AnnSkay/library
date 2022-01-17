import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

interface UserType {
  id?: number;
  name?: string;
  lastname?: string;
  login?: string;
  password?: string;
  role?: string;
  phone?: string;
}

interface BookType {
  id?: number;
  title?: string;
  author?: string;
  houseId?: number;
  houseTitle?: string;
  genreId?: number;
  genreTitle?: string;
  year?: number;
  numberCopies?: number;
  dateIssue?: Date | string;
  dateIssueFormat?: string;
  userName?: string;
  userLastname?: string;
  userEmail?: string;
  userPhone?: string;
}

interface HouseAndGenreType {
  id: number;
  title: string;
}

// interface BorrowedBookType {
//   bookId?: number;
//   userId?: number;
//   dateIssue?: Date;
//   dateReturn?: Date;
// }

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

let books = [
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

// функция получения даты в формате 'dd.mm.yy г. hh:mm'
const getDateFormat = (date: Date) => {
  let day: number | string = date.getDate()
  if (day < 10) {
    day = `0${day}`
  }

  let month: number | string = date.getMonth() + 1
  if (month < 10) {
    month = `0${month}`
  }

  let year: number | string = date.getFullYear() % 100
  if (year < 10) {
    year = `0${year}`
  }

  let hours: number | string = date.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }

  let minutes: number | string = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day}.${month}.${year} г. ${hours}:${minutes}`
}

// функция получения книги с жанром и издательством в виде текста, а не id
const getBookData = (book: BookType) => {
  const houseTitle = (houses.find(house => house.id === book.houseId) || {}).title || ''
  const genreTitle = (genres.find(genre => genre.id === book.genreId) || {}).title || ''

  book.houseTitle = houseTitle
  book.genreTitle = genreTitle

  return book
}

// функция определения правильного жанра/издательства для добавления новой книги
const getUniqueBookValue = (array: HouseAndGenreType[], nameArray: string, findingElement: string) => {
  const sameElement: string = (array.find(element => element.title === findingElement) || {}).title || ''

  if (sameElement) {
    return sameElement
  } else {
    const obj = {
      id: 0,
      title: ''
    }

    obj.id = array[array.length - 1].id + 1
    obj.title = findingElement

    switch (nameArray) {
      case 'houses':
        houses.push(obj)
        break
      case 'genres':
        genres.push(obj)
    }

    return findingElement
  }
}

// отправляет данные пользователя по полученному id
router.post('/api/users/user-data', async (ctx, next) => {
  console.log('attempt user', ctx.request.body)

  ctx.body = users.find(user => user.id === Number(ctx.request.body.id)) || 'no user'
  await next()
})

// осуществляет вход пользователя по логину и паролю
router.post('/api/users/login', async (ctx, next) => {
  console.log('attempt login', ctx.request.body)

  for (let i = 0; i < users.length; i++) {
    if (ctx.request.body.login === users[i].login &&
      ctx.request.body.password === users[i].password) {
      ctx.body = {
        id: users[i].id,
        isSuccess: true
      }
      return
    }
  }

  ctx.body = {
    isSuccess: false
  }

  await next()
})

// добавляет пользователя в базу при регистрации по полученным данным из полей ввода
router.post('/api/users/add-user', async (ctx, next) => {
  console.log('attempt addUser', ctx.request.body)

  for (let i = 0; i < users.length; i++) {
    if (users[i].login === ctx.request.body.email) {
      ctx.body = 'Пользователь с таким email уже существует'

      return
    }
  }

  const user = {
    id: 0,
    name: '',
    lastname: '',
    login: '',
    password: '',
    role: '',
    phone: ''
  }

  user.id = users[users.length - 1].id || -1 + 1
  user.name = ctx.request.body.name
  user.lastname = ctx.request.body.lastname
  user.login = ctx.request.body.email
  user.password = ctx.request.body.password
  user.role = 'USER'
  user.phone = ctx.request.body.phone

  users.push(user)

  ctx.body = 'Вы зарегистрированы'

  await next()
})

// изменяет личные данные пользователя
router.post('/api/users/change-user-data', async (ctx, next) => {
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
router.post('/api/users/change-user-password', async (ctx, next) => {
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

// отправляет список жанров для раскрывающего списка поиска книг
router.get('/api/books/genres', async (ctx, next) => {
  console.log('attempt genres', ctx.request.body)

  ctx.body = genres

  await next()
})

// отправляет список издательств для раскрывающего списка поиска книг
router.get('/api/books/houses', async (ctx, next) => {
  console.log('attempt houses', ctx.request.body)

  ctx.body = houses

  await next()
})

// поиск книг по полученному фильтру
router.get('/api/books/found-by-filter', async (ctx, next) => {
  console.log('attempt books', ctx.request.query)

  const booksFilter: BookType[] = []
  const bookIsAvailable = ctx.request.query.bookIsAvailable === 'true'

  const houseId = (houses.find(house => house.title === ctx.request.query.bookPublishHouse) || {}).id || -1
  const genreId = (genres.find(genre => genre.title === ctx.request.query.bookGenre) || {}).id || -1

  for (let i = 0; i < books.length; i++) {
    if (
      books[i].title.includes(<string>ctx.request.query.bookTitle) &&
      books[i].author.includes(<string>ctx.request.query.bookAuthor) &&
      (books[i].houseId === houseId || !ctx.request.query.bookPublishHouse) &&
      (books[i].genreId === genreId || !ctx.request.query.bookGenre) &&
      (books[i].year === Number(ctx.request.query.bookPublishYear) || !ctx.request.query.bookPublishYear) &&
      ((books[i].numberCopies > 0 && bookIsAvailable) || !bookIsAvailable)
    ) {
      booksFilter.push(getBookData(books[i]))
    }
  }

  ctx.body = booksFilter

  await next()
})

// отправляет список всех взятых книг
router.get('/api/books/all-borrowed', async (ctx, next) => {
  console.log('attempt allBorrowedBooks', ctx.request.body)

  const allBorrowedBooks: BookType[] = []

  for (let i = 0; i < borrowedBooks.length; i++) {
    if (borrowedBooks[i].dateReturn.getTime() > new Date().getTime()) {
      const borrowedBook: BookType = {}

      const bookInf: BookType = books.find(book => book.id === borrowedBooks[i].bookId) || {}
      const user: UserType = users.find(user => user.id === borrowedBooks[i].userId) || {}

      borrowedBook.id = bookInf.id
      borrowedBook.title = bookInf.title
      borrowedBook.author = bookInf.author
      borrowedBook.houseId = bookInf.houseId
      borrowedBook.genreId = bookInf.genreId
      borrowedBook.year = bookInf.year

      const houseTitle = (houses.find(house => house.id === bookInf.houseId) || {}).title || ''
      const genreTitle = (genres.find(genre => genre.id === bookInf.genreId) || {}).title || ''

      const dateFormat = getDateFormat(borrowedBooks[i].dateIssue)

      borrowedBook.houseTitle = houseTitle
      borrowedBook.genreTitle = genreTitle
      borrowedBook.dateIssue = borrowedBooks[i].dateIssue
      borrowedBook.dateIssueFormat = dateFormat

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
router.get('/api/books/borrowed-by-user', async (ctx, next) => {
  console.log('attempt borrowedBooksByUser', ctx.request.query)

  const userBorrowedBooks: BookType[] = []

  for (let i = 0; i < borrowedBooks.length; i++) {
    if (borrowedBooks[i].userId === Number(ctx.request.query.id) &&
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

// отправляет список книг по полученному названию книги
router.get('/api/books/found-by-title', async (ctx, next) => {
  console.log('attempt booksByTitle', ctx.request.query)

  const booksByTitle: BookType[] = []

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.includes(<string>ctx.request.query.bookTitle)) {
      booksByTitle.push(getBookData(books[i]))
    }
  }

  ctx.body = booksByTitle

  await next()
})

// позволяет добавить новую книгу
router.post('/api/books/add-book', async (ctx, next) => {
  console.log('attempt addBook', ctx.request.body)

  const addingBook = {
    id: 0,
    title: '',
    author: '',
    houseId: 0,
    genreId: 0,
    year: 0,
    numberCopies: 0
  }

  let publishHouseTitle = ctx.request.body.publishHouse
  let genreTitle = ctx.request.body.genre

  if (!ctx.request.body.publishHouse) {
    if (!ctx.request.body.otherPublishHouse) {
      publishHouseTitle = 'Нет издательства'
    } else {
      publishHouseTitle = getUniqueBookValue(houses, 'houses', ctx.request.body.otherPublishHouse)
    }
  }

  if (!ctx.request.body.genre) {
    if (!ctx.request.body.otherGenre) {
      genreTitle = 'Нет жанра'
    } else {
      genreTitle = getUniqueBookValue(genres, 'genres', ctx.request.body.otherGenre)
    }
  }

  const houseId = (houses.find(house => house.title === publishHouseTitle) || {}).id || -1
  const genreId = (genres.find(genre => genre.title === genreTitle) || {}).id || -1

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
router.post('/api/books/take-book', async (ctx, next) => {
  console.log('attempt takeBook', ctx.request.body)

  const userTakenBook = {
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
      books[i].numberCopies--
    }
  }

  userTakenBook.bookId = parseInt(ctx.request.body.bookId, 10)
  userTakenBook.userId = parseInt(ctx.request.body.id, 10)
  userTakenBook.dateIssue = new Date()
  userTakenBook.dateReturn = new Date(2032, 0, 1)

  borrowedBooks.push(userTakenBook)

  ctx.body = 'Книга взята'

  await next()
})

// позволяет удалить книгу
router.post('/api/books/delete-book', async (ctx, next) => {
  console.log('attempt deleteBook', ctx.request.body)

  books = books.filter(book => book.id !== ctx.request.body.bookId)

  ctx.body = 'Книга удалена'

  await next()
})

// позволяет вернуть взятую книгу
router.post('/api/books/return-book', async (ctx, next) => {
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

app.use(router.middleware())

app.listen(3002)
