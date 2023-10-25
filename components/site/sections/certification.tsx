'use client'
import { CertificatesPanel } from '@/components/core/certificates'
import { SkillBadgesList } from '@/components/core/skills'
import { useSkills } from '@/hooks/useSkills'
import { filterCertificatesBySkills, getCertificates, getSkillList } from '@/lib/data'


export function CertificationSection() {
    let certificates = getCertificates()
    const SKILL_LIST = getSkillList()
    const { selectedSkills, toggleSkill, skillIsActive } = useSkills()

    return (
        <section className='
          flex flex-col justify-center items-center
          p-8 w-100
        '>
            <h2 className='text-3xl font-bold text-slate-800'>
                Certificates
            </h2>
            <div className='
                flex flex-col justify-center items-center gap-1
                m-1 sm:m-8 sm:w-3/4
            '>
                <h2 className='text-xl font-bold text-slate-800'>
                    Filter by skills
                </h2>
                <div className='flex flex-wrap justify-start gap-2 sm:gap-2
                    m-2
                '>
                    <SkillBadgesList skills={SKILL_LIST} toggleSkill={toggleSkill} skillIsActive={skillIsActive} />
                </div>
            </div>
            <CertificatesPanel certificates={
                filterCertificatesBySkills(
                    certificates,
                    selectedSkills.length ? selectedSkills : SKILL_LIST
                )
            } />
        </section>
    )
}
