import * as fs from 'fs'
import path from 'path'
import fastifyStatic from '@fastify/static'
require('dotenv').config()
let Client = require('ssh2-sftp-client');

const filePath = path.join(__dirname, 'vault')
let lastUpdate = new Date()
let client = new Client();

const init = () => {
    return new Promise(async (res, rej) => {
        if (fs.existsSync(__dirname + '/vault')) {
            await fs.promises.rm(__dirname + '/vault', { recursive: true, force: true })
        }

        try {
            await client.connect({
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
                username: process.env.USER,
                password: process.env.PASSWORD,
            })

            console.log('Creating folder...');
            await fs.promises.mkdir(filePath)
            console.log('Downloading player files...');
            await client.downloadDir("/playerSnapshots", filePath)
            console.log('Complete!');
            client.end()
            // lastUpdate = new Date()
            res('')
        }
        catch (err) {
            console.log(err)
            rej(err)
        }
    })
}

setInterval(() => {
    init()
}, 3600000)

const fastify = require('fastify')()

fastify.register(require('@fastify/cors'), {
    // put your options here
})

// Declare a route
fastify.register(fastifyStatic, {
    root: __dirname,
})

fastify.get("/api/snapshots", async (req, res) => {
    let data: any = await getData();
    data.sort(({ vaultLevel: aLevel }, { vaultLevel: bLevel }) => +bLevel - +aLevel)

    res.send(data)
});

fastify.get("/api/refresh", async (req, res) => {
    init()
    res.send('Refreshing data...')
});

const getData = () => {
    return new Promise(async (res, rej) => {
        fs.readdir(path.join(__dirname, 'vault'), async (err, files) => {
            if (!files) return
            let snapshots = []

            for (let i = 0; i < files.length; i++) {
                const fileName = files[i];
                if (fileName === "whitelist.json") continue
                try {
                    let data = await
                        fs.promises.readFile(path.join(__dirname, 'vault', fileName), 'utf8')
                    const json = JSON.parse(data)

                    snapshots.push(json)
                } catch (err) {
                    console.log(err);
                }
            }
            res(snapshots)
        })
    })
}
fastify.get("/api/last-update", (req, res) => {
    res.send(lastUpdate.toUTCString())
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(4000)
    } catch (err) {
        // console.log(err);

        fastify.log.error(err)
        process.exit(1)
    }
}
start()