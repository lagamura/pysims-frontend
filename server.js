import { createServer } from 'http'
import { readFile } from 'fs'
const httpPort = 80

createServer((req, res) => {
    readFile('index.html', 'utf-8', (err, content) => {
        if (err) {
            console.log('We cannot open "index.html" file.')
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        })

        res.end(content)
    })
})
    .listen(httpPort, () => {
        console.log('Server listening on: http://localhost:%s', httpPort)
    })