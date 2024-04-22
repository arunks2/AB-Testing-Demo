const app = require('./app')
const port = 3001;
async function startServer () {
    try {
        app.listen(3001, () => {
            console.log(`server is running on port : ${port}`)
        })
    } catch (error) {
        console.error('Failed to start the server', error)
        process.exit(1)
    }
}

startServer();
