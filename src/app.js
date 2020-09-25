import express from 'express'
import swaggerDocument from'./../swagger.json'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/users', userRoutes)

app.get('/', (req, res) => {
    res.status(200).send({
        status:'success',
        message: 'welcome to find home'
    })
})

export default app