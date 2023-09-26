import data from '@/data/certificates.json'
import { Certificate } from "@/types/certificates"

export function getSkillList() {
    let certificates: Certificate[] = data

    return [...new Set(
      certificates
        .map((item) => item.skills)
        .flat()
    )]
}
