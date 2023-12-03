import { defineDocumentType, makeSource } from '@contentlayer/source-files'


export const Certificate = defineDocumentType(() => ({
    name: 'Certificate',
    filePathPattern: `certificates/**/*.md`,
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

export const Experience = defineDocumentType(() => ({
    name: 'Experience',
    filePathPattern: `curriculum/**/*.md`,
    fields: {
        role: { type: 'string', required: true },
        employment_type: { type: 'string', required: true },
        company: { type: 'string', required: true },
        location: { type: 'string', required: true },
        start_date: { type: 'string', required: true },
        end_date: { type: 'string', required: true },
        skills: { type: 'list', of: {type:'string'}, required: true },
        description: { type: 'string', required: true },
        impact: { type: 'string', required: false },
    }
}))

export default makeSource({ contentDirPath: 'content', documentTypes: [Certificate, Experience] })
