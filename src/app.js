import express from 'express'
import bodyParser from 'body-parser'
import i18n from 'i18n'
import swaggerDocument from './../swagger.json'
import swaggerUi from 'swagger-ui-express'
import userRoutes from './routes/userRoutes'
import houseRoutes from './routes/houseRoutes'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(bodyParser.json())

i18n.configure({
    locales: ['en', 'fr', 'rw'],
    header: 'accept-language',
    extension: '.json',
    queryParameter: 'lang',
    directoryPermissions: '755',
    autoReload: true,
    directory: __dirname + '/../locales'
});

app.use(i18n.init)
app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.status(200).json({
        message: res.__('welcome')
    })
})

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/houses', houseRoutes)


app.all('*', (req, res) => {
    res.status(404).json({
        message: res.__('404')
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => console.info(`Running on port ${PORT}`))

export default app