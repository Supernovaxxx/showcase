const fs = require('fs')
const path = require('path')
const string = require('lodash/string')
const yaml = require('js-yaml')

// Check if the correct number of command-line arguments is provided
if (process.argv.length < 4) {
    console.error('Usage: node <script.js> <folder> <newNameProperty1> <newNameProperty2>')
    process.exit(1)
}

// Extract the folder argument from command-line arguments
const folder = process.argv[2]
const newNameProperty1 = process.argv[3]
const newNameProperty2 = process.argv[4]

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
            
            // Split the content into separate YAML documents
            const documents = data.split('---')
            
            // Parse each YAML document
            documents.forEach((document, index) => {
                try {
                    // Skip empty documents
                    if (document.trim() === '') {
                        return;
                    }
                    
                    // Parse YAML document
                    const contentObject = yaml.load(document)
                    
                    // Access first property that will be used to name file in the content, excluding subtitles
                    const property1 = contentObject[newNameProperty1]
                    const property1Short = property1.split(':')[0]
                    
                    // Access second property that will be used to name file in the content, excluding subtitles
                    const property2 = contentObject[newNameProperty2]
                    const property2Short = property2.split(':')[0]
                    
                    // Build new file name using 2 properties from file and parsing to kebab case
                    const newFileName = string.kebabCase(`${property1Short}-${property2Short}`)
                   
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
})
