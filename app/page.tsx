'use client'
import { CertificateType } from '@/types/certificates'
import data from '@/data/certificates.json'
import Certificates from '@/components/certificates'
import Skills from '@/components/skills'
import { useState } from 'react'
import { getSkillList } from '@/lib/data-loader'
import { Skill } from '@/types/skills'

export default function Home() {
  let certificates: CertificateType[] = data
  const SKILL_LIST = getSkillList()

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])

  function toggleSkill(skill: Skill): void {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((selected) => selected !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className='w-100 flex flex-col justify-center items-center'>
      <Skills skills={SKILL_LIST} toggleSkill={toggleSkill} />
      <Certificates certificates={certificates} />
    </div>
  )
}
