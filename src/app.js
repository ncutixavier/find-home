import express from 'express'
import swaggerDocument from'./../swagger.json'
import swaggerUi from 'swagger-ui-express'
const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.status(200).send({
        status:'success',
        message: 'welcome to find home'
    })
})

export default app