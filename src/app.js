import http from 'http'
import { env, mongo, port, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, () => {
    console.log(
      'Express server listening on http://localhost:%d, in %s mode',
      port,
      env
    )
  })
})

export default app
