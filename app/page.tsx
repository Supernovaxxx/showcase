'use client'
import { CertificatesPanel } from '@/components/certificates'
import CertificatesSection from '@/components/sections/certificates'
import { SkillBadgesList, useSkills } from '@/components/skills'
import { getCertificates, getSkillList, filterCertificatesBySkills } from '@/lib/data'

export default function Home() {

  return (
    <main>
      <CertificatesSection />
    </main>
  )
}
