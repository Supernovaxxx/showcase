'use client'
import { Certificates } from '@/components/certificates'
import { Skills, useSkills } from '@/components/skills'
import { getCertificates, getSkillList, filterCertificatesBySkills } from '@/lib/data'

export default function Home() {
  let certificates = getCertificates()
  const SKILL_LIST = getSkillList()
  const { selectedSkills, toggleSkill, skillIsActive } = useSkills()
  
  return (
    <div 
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
      <Skills skills={SKILL_LIST} toggleSkill={toggleSkill} skillIsActive={skillIsActive} />
      <Certificates certificates={
        filterCertificatesBySkills(
          certificates,
          selectedSkills.length ? selectedSkills : SKILL_LIST
        )
      } />
    </div>
  )
}
