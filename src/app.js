import express from 'express'
import bodyParser from 'body-parser'
import i18n from 'i18n'
import swaggerDocument from './../swagger.json'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'

const app = express()
app.use(bodyParser.json())

i18n.configure({
    locales: ['en', 'fr', 'rw'],
    header: 'accept-language',
    extension: '.json',
    queryParameter: 'lang',
    directoryPermissions: '755',
    autoReload: true,
    cookie: 'yourcookiename',
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

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: res.__('404')
    })
})

export default app