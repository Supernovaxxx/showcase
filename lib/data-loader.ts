import data from '@/data/certificates.json'
import { Certificate } from "@/types/certificates"

export function getCertificates() {
  const certificates: Certificate[] = data

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
