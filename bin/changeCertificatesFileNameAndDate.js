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

                    // Access title property in the content
                    const title = contentObject.title

                    //Modify title to exclude subtitles and convert to kebabCase
                    const shortTitle = title.split(':')[0]
                    const newFileName = string.kebabCase(shortTitle)

                    // Modify current date format to yyyy-mm-dd
                    const date = contentObject.date
                    const newDate = date.split('T')[0]

                    // Rewrite file with new date format
                    const newObject = {
                        title: contentObject.title,
                        date: newDate,
                        skills: contentObject.skills,
                        issuer: contentObject.issuer,
                        imageUrl: contentObject.imageUrl,
                        certificateUrl: contentObject.certificateUrl
                    }

                    const newYamlContent = yaml.dump(newObject, { quotes: false })
                    
                    fs.writeFile(`${directoryPath}/${file}`, `---\n${newYamlContent}---`, 'utf8', (err) => {
                        if (err) {
                            console.log('Error writing to file:', err);
                        } else {
                            console.log('File updated successfully!');
                        }
                    })

                    // Rename file with new name
                    fs.rename(filePath, `${directoryPath}/${newFileName}-${newDate}.md`, (err) => {
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
