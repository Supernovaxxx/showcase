'use client'
import { Certificate } from '@/types/certificates'
import data from '@/data/certificates.json'
import { Certificates } from '@/components/certificates'
import { Skills } from '@/components/skills'
import { getSkillList } from '@/lib/data-loader'
import { filterCertificatesBySkills } from '@/lib/utils'
import { useSkills } from '@/components/skills/useSkills'

export default function Home() {
  let certificates: Certificate[] = data
  const SKILL_LIST = getSkillList()
  const { selectedSkills, toggleSkill } = useSkills()

  return (
    <div className='w-100 flex flex-col justify-center items-center'>
      <Skills skills={SKILL_LIST} toggleSkill={toggleSkill} selectedSkills={selectedSkills} />
      <Certificates certificates={
        filterCertificatesBySkills({
          certificates,
          skills: selectedSkills.length ? selectedSkills : SKILL_LIST
        })
      } />
    </div>
  )
}
