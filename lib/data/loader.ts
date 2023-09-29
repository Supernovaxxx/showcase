import certificatesData from '@/data/certificates.json'
import { Certificate } from "@/types/core"

export function getCertificates() {
    const certificates: Certificate[] = certificatesData

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
