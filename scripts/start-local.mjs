import { spawn, spawnSync } from 'node:child_process'
import net from 'node:net'
import fs from 'node:fs'

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const envPath = new URL('../.env', import.meta.url)

if (!fs.existsSync(envPath)) {
  console.error('Не найден .env. Скопируйте .env.example в .env и задайте локальный секрет.')
  process.exit(1)
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', env: process.env })
  if (result.status !== 0) process.exit(result.status || 1)
}

function waitForPostgres(host = '127.0.0.1', port = 5432, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const started = Date.now()
    const attempt = () => {
      const socket = net.createConnection({ host, port })
      socket.setTimeout(1000)
      socket.once('connect', () => { socket.destroy(); resolve() })
      socket.once('error', () => {
        socket.destroy()
        if (Date.now() - started > timeoutMs) reject(new Error('PostgreSQL не запустился за 60 секунд. Проверьте Docker Desktop.'))
        else setTimeout(attempt, 1200)
      })
      socket.once('timeout', () => socket.destroy())
    }
    attempt()
  })
}

console.info('Запускаю локальную базу PostgreSQL…')
run('docker', ['compose', 'up', '-d', 'db'])
await waitForPostgres()
console.info('Готовлю начальное наполнение сайта…')
run(npm, ['run', 'seed'])

const dev = spawn(npm, ['run', 'dev'], { stdio: 'inherit', env: process.env })
const stop = () => { dev.kill('SIGINT') }
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
dev.on('exit', (code) => process.exit(code ?? 0))
