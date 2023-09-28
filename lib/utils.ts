import { Certificate, Skill } from "@/types/core"
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

export function convertDateFromIsoToMonthYear(isoDate: string) { // TODO: define ISO string type
  return new Date(isoDate).toLocaleDateString(
    'en-gb',
    {
      year: 'numeric',
      month: 'short'
    }
  )
}
