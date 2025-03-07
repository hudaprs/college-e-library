import express from 'express'
import 'express-async-errors'
import 'dotenv/config'
import cors from 'cors'
// import morganBody from 'morgan-body'
// import { loggerMiddleware, loggerStream } from '@/app/utils/logger.util'
import { ValidationService } from './app/services/validation.service'
import { rootRouter } from './root.router'

const app = express()
app.use(cors())
app.use(express.json({ limit: '100mb' }))
// app.use(loggerMiddleware)
// morganBody(app, {
//   stream: loggerStream
// })

app.use(rootRouter)

app.all('*', () => {
  throw new Error('Route not found', {
    cause: {
      statusCode: 404
    }
  })
})

app.use(ValidationService.handleError)

export { app as server }
