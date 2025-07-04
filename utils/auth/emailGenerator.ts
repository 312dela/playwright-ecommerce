import fs from 'fs'
import path from 'path'

const counterFile = path.resolve(__dirname, 'email-counter.txt')
const tempFile = path.resolve(__dirname, 'email-temp.json')

function readCounter(): number {
  if (!fs.existsSync(counterFile)) {
    fs.writeFileSync(counterFile, '1')
    return 1
  }
  const val = fs.readFileSync(counterFile, 'utf-8')
  return parseInt(val, 10)
}

function writeCounter(newVal: number) {
  fs.writeFileSync(counterFile, newVal.toString())
}

export function generateEmail(): { lowercase: string; uppercase: string } {
  if (fs.existsSync(tempFile)) {
    return JSON.parse(fs.readFileSync(tempFile, 'utf-8'))
  }

  const counter = readCounter()
  const base = `autoregistration${counter}@yopmail.com`
  const result = {
    lowercase: base,
    uppercase: base.charAt(0).toUpperCase() + base.slice(1)
  }

  fs.writeFileSync(tempFile, JSON.stringify(result))
  writeCounter(counter + 1)

  return result
}
