import { execSync } from 'child_process'
;(() => {
  if (!(process.argv.includes('-n') && process.argv.length >= 4)) {
    console.log()
    console.log('\x1B[31m%s\x1B[0m', '请输入名称')
    console.log()
    return
  }
  execSync(`typeorm migration:create ./src/migrations/${process.argv[3]}`)
})()
