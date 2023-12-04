const fs = require('fs')
const path = require('path')
const string = require('lodash/string')
const yaml = require('js-yaml')

// Check if the correct number of command-line arguments is provided
if (process.argv.length < 4) {
    console.error('Usage: node <script.js> <folder> <newNameProperty1> <newNameProperty2> <newNameProperty3>')
    process.exit(1)
}

// Extract the folder argument from command-line arguments
const folder = process.argv[2]
const newNameProperties = [process.argv[3], process.argv[4], process.argv[5]]

const directoryPath = path.resolve(folder)

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

                // Access properties that will be used to name file in the content, exclude subtitles and parse to kebab case
                const kebabCaseShortProperties = newNameProperties.map((property) => {
                    return string.kebabCase(
                        contentObject[property]
                            .split(':')[0]
                    )
                })

                // Build new file name using properties from file
                const newFileName = kebabCaseShortProperties.join('_')

                // Rename file
                fs.rename(filePath, `${directoryPath}/${newFileName}.md`, (err) => {
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
