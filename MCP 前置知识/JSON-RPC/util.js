import { writeFileSync } from 'node:fs'

export default {
  sum({ a, b }) {
    return a + b
  },
  createFile({ filename, content }) {
    try {
      writeFileSync(filename, content)
      return true
    } catch (error) {
      return false
    }
  }
}