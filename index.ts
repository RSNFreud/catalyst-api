import * as ftp from "basic-ftp"
import * as fs from 'fs'
import path from 'path'
import fastifyStatic from '@fastify/static'
require('dotenv').config()

const filePath = path.join(__dirname, 'vault')
let lastUpdate = new Date()

const init = () => {
    return new Promise(async (res, rej) => {
        const client = new ftp.Client()

        if (fs.existsSync(__dirname + '/vault')) {
            await fs.promises.rm(__dirname + '/vault', { recursive: true, force: true })

        }

        try {
            await client.access({
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
                user: process.env.USER,
                password: process.env.PASSWORD,
                secure: false
            })
            console.log('Creating folder...');
            await fs.promises.mkdir(filePath)
            console.log('Downloading player files...');
            await client.downloadToDir(filePath, '/playerSnapshots')
            console.log('Creating whitelist.json');
            await fs.promises.writeFile(filePath + '/whitelist.json', '')
            console.log('Inserting data into whitelist');
            await client.downloadTo(filePath + '/whitelist.json', 'whitelist.json')
            console.log('Complete!');
            lastUpdate = new Date()
            res('')
        }
        catch (err) {
            console.log(err)
            rej(err)
        }
        client.close()
    })
}

fs.promises.access(path.join(__dirname, 'vault', 'whitelist.json'), fs.constants.F_OK).catch(async (err) => {
    if (err.message.includes('no such file or directory')) await init()
})


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
        try {
            await fs.promises.access(path.join(__dirname, 'vault', 'whitelist.json'), fs.constants.F_OK);
        } catch (err) {
            console.log('No whitelist found...');
            if (err.message.includes('no such file or directory')) await init()
        }

        const whitelist = JSON.parse(await fs.promises.readFile(path.join(__dirname, 'vault', 'whitelist.json'), 'utf8')).map(({ uuid }) =>
            uuid
        )

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

                    if (!whitelist.includes(json.playerUUID)) continue

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