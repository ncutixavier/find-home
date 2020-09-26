import express from 'express'
import swaggerDocument from './../swagger.json'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes'
import welcomeRoutes from './routes/welcomeRoutes'
import AppError from './utils/AppError'
import GlobalErrorHandler from './controllers/errorControllers'


const app = express()

app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/users', userRoutes)
app.use('/', welcomeRoutes)

app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

app.use(GlobalErrorHandler)

export default app