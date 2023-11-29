import { allCertificates,  } from '@/.contentlayer/generated'

export function getCertificates() {
    const certificates = allCertificates
    return certificates
}

export function getSkillList() {
    let certificates = getCertificates()

    return [...new Set(
        certificates
            .map((item) => item.skills)
            .flat()
    )]
}
