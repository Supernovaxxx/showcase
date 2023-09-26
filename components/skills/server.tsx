import { Skill, ToggleSkill } from "@/types/skills"
import { SkillBadge } from "./client"

interface SkillsProps {
    skills: Skill[]
    selectedSkills: Skill[]
    toggleSkill: ToggleSkill
}

export function Skills({ skills, 
    selectedSkills,
    toggleSkill 
}: SkillsProps) {

    return (
        <section className='m-8 flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-xl font-bold text-slate-800'>Skills</h2>
            <div className='flex gap-2 m-2 flex-wrap'>
                {
                    skills.map((skill: string, index) => (
                        <SkillBadge skill={skill} 
                        toggleSkill={toggleSkill} 
                        selectedSkills={selectedSkills}
                        key={index} />
                    ))
                }
            </div>
        </section>
    )
}
