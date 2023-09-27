import { Certificate } from "@/types/certificates"
import { Skill } from "@/types/skills"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FilterCertificatesBySkillsProps {
  certificates: Certificate[]
  skills: Skill[]
}

export function filterCertificatesBySkills({ certificates, skills }: FilterCertificatesBySkillsProps): Certificate[] {
  // Find all certificates with skills that intersect selected skill list

  return certificates.filter(
    (certicate) => skills.some(
      (skill: Skill) => certicate.skills.includes(skill)
    )
  )
}
