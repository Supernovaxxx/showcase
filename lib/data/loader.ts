import { certification } from 'contentlayer/generated'
import { Certificate } from '@/types/core'


export function getCertificates() {
    return certification.data
}

export function getSkillList() {
    let certificates = getCertificates()

    return [...new Set(
        certificates
            .map((item: Certificate) => item.skills)
            .flat()
    )]
}
