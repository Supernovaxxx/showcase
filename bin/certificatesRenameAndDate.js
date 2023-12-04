const fs = require('fs')
const path = require('path')
const string = require('lodash/string')
const yaml = require('js-yaml')
const directoryPath = path.join(__dirname, '../content/certificates/')

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err)
    }

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file)

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.log('Error reading file: ' + err)
            }

            // Split the frontmatter content and catch the YAML itself
            const document = data.split('---')[1]
            
            try {
                // Parse YAML document
                const contentObject = yaml.load(document)

                // Access title property in the content and modify string to rename file
                const title = contentObject.title
                const newFileName = string.kebabCase(
                    title.split(':')[0]
                )

                // Modify current date format to yyyy-mm-dd
                const date = contentObject.date
                const newDate = date.split('T')[0]

                // Rewrite file with new date format
                const newObject = {
                    ...contentObject,
                    date: newDate,
                }

                const newYamlContent = yaml.dump(newObject, { quotes: false })

                fs.writeFile(`${directoryPath}/${file}`, `---\n${newYamlContent}---`, 'utf8', (err) => {
                    if (err) {
                        console.log('Error writing to file:', err)
                    } else {
                        console.log('File updated successfully!')
                    }
                })

                // Rename file with new name
                fs.rename(filePath, `${directoryPath}/${newFileName}_${contentObject.issuer}_${contentObject.courseRelease}.md`, (err) => {
                    if (err) {
                        console.log('error renaming file:', err)
                    } else {
                        console.log('file renamed successfully!')
                    }
                })
            } catch (e) {
                console.log('Error parsing YAML:', e)
            }
        })
    })
})
