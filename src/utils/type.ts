import { exec } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'

const createJSONFileSync = (
  path: string,
  fileName: `${string}.json`,
  stringifyJSON: string,
) => {
  const jsonFilePath = join(path, fileName)
  writeFileSync(jsonFilePath, stringifyJSON, 'utf8')
}

const createTypeFile = (
  typeFilePath: string,
  typeFileName: `${string}.ts`,
  jsonFileName: string,
  jsonFilePath: `${string}.json`,
) => {
  const typesFilePath = join(typeFilePath, typeFileName)
  const jsonFullPath = jsonFileName + jsonFilePath
  exec(
    `npx quicktype -l typescript -o ${typesFilePath} ${jsonFullPath} --just-types`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
    },
  )
}

export { createJSONFileSync, createTypeFile }
