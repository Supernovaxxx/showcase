import { CertificateType } from "@/types/certificates"
import { Skill } from "@/types/skills"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterCertificatesBySkills(certificates: CertificateType[], selectedSkills: Skill[], SKILL_LIST: Skill[]): CertificateType[] {
  // Find all certificates with skills that intersect selected skill list

  let skills:Skill[]
  selectedSkills.length 
  ? skills = selectedSkills 
  : skills = SKILL_LIST

  return certificates.filter(
    (certicate) => skills.some(
      (skill: Skill) => certicate.skills.includes(skill)
    )
  )
}
