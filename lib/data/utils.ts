import { Certificate, Skill } from "@/types/core"

export function filterCertificatesBySkills(
    certificates: Certificate[],
    skills: Skill[],
): Certificate[] {
    // Find all certificates with skills that intersect selected skill list

    return certificates.filter(
        (certicate) => skills.some(
            (skill: Skill) => certicate.skills.includes(skill)
        )
    )
}
