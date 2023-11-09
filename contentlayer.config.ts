import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'


export const Certificate = defineNestedType(() => ({
    name: 'Certificate',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'string', required: true },
        skills: {
            type: 'list',
            of: { type: 'string' },
            required: true,
        },
        issuer: { type: 'string', required: true },
        imageUrl: { type: 'string' },
        certificateUrl: { type: 'string' },
    },
}))

export const CertificationData = defineDocumentType(() => ({
    name: 'Certification',
    filePathPattern: `certificates.yml`,
    contentType: 'data',
    isSingleton: true,
    fields: {
        data: {
            type: 'list',
            of: Certificate,
            required: true,
        },
    },
}))

export default makeSource({
    contentDirPath: process.env.CONTENT_DIR || 'content',
    documentTypes: [
        CertificationData,
})