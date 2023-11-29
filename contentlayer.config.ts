import { defineDocumentType, makeSource } from '@contentlayer/source-files'


export const Certificate = defineDocumentType(() => ({
    name: 'Certificate',
    filePathPattern: `**/*.md`,
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'string', required: true },
        skills: { type: 'list', of: {type:'string'}, required: true },
        issuer: { type: 'string', required: true },
        imageUrl: { type: 'string', required: false },
        certificateUrl: { type: 'string', required: false }
    },
    computedFields: {
        url: { type: 'string', resolve: (certificate) => `/content/certificates/${certificate._raw.flattenedPath}` },
    },
}))

export default makeSource({ contentDirPath: 'content/certificates', documentTypes: [Certificate] })
