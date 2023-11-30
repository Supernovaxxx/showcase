import { allCertificates, allExperiences } from '@/.contentlayer/generated'

export function getCertificates() {
    const certificates = allCertificates
    return certificates
}

export function getExperiences() {
    const experiences = allExperiences
    return experiences
}

export function getSkillList() {
    let certificates = getCertificates()

    return [...new Set(
        certificates
            .map((item) => item.skills)
            .flat()
    )]
}
