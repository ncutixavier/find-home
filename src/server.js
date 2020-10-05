import app from './app'

const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
//"start": "npm run build && node ./dist/server.js",
