'use client'
import { Certificates } from '@/components/certificates'
import { Skills } from '@/components/skills'
import { getCertificates, getSkillList } from '@/lib/data-loader'
import { filterCertificatesBySkills } from '@/lib/utils'
import { useSkills } from '@/components/skills/useSkills'

export default function Home() {
  let certificates = getCertificates()
  const SKILL_LIST = getSkillList()
  const { selectedSkills, toggleSkill, skillIsActive } = useSkills()
  
  return (
    <div className='w-100 flex flex-col justify-center items-center p-8'>
      <h2 className='text-3xl font-bold text-slate-800 '>Certificates</h2>
      <Skills skills={SKILL_LIST} toggleSkill={toggleSkill} skillIsActive={skillIsActive} />
      <Certificates certificates={
        filterCertificatesBySkills({
          certificates,
          skills: selectedSkills.length ? selectedSkills : SKILL_LIST
        })
      } />
    </div>
  )
}
