// import express from 'express'
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome here')
})

const port = process.env.PORT || 8050

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app
// export default app