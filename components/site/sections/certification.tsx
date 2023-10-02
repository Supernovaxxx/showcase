'use client'
import { CertificatesPanel } from '@/components/core/certificates'
import { SkillBadgesList, useSkills } from '@/components/core/skills'
import { getCertificates, getSkillList, filterCertificatesBySkills } from '@/lib/data'

export function CertificationSection() {
    let certificates = getCertificates()
    const SKILL_LIST = getSkillList()
    const { selectedSkills, toggleSkill, skillIsActive } = useSkills()

    return (
        <section
            className='
          flex flex-col justify-center items-center
          p-8
          w-100
        '
        >
            <h2
                className='
            text-3xl font-bold text-slate-800
          '
            >
                Certificates
            </h2>
            <SkillBadgesList skills={SKILL_LIST} toggleSkill={toggleSkill} skillIsActive={skillIsActive} />
            <CertificatesPanel certificates={
                filterCertificatesBySkills(
                    certificates,
                    selectedSkills.length ? selectedSkills : SKILL_LIST
                )
            } />
        </section>
    )
}
