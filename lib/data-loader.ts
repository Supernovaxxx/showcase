import data from '@/data/certificates.json'
import { CertificateType } from "@/types/certificates"

export function getSkillList() {
    let certificates: CertificateType[] = data

    return [...new Set(
      certificates
        .map((item) => item.skills)
        .flat()
    )]
}
