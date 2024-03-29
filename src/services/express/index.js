import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)

  // Serve React client
  app.use(
    express.static(path.join(__dirname, '../../../client/build'), {
      redirect: false
    })
  )
  app.get('*', (_, res) => {
    res.sendFile(path.join(
      __dirname,
      '../../../client/build/index.html'
    ))
  })

  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
