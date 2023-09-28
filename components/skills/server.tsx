import { Skill, ToggleSkill, SkillIsActive } from "@/types/core"
import { SkillBadge } from "./client"

interface SkillsProps {
    skills: Skill[]
    toggleSkill: ToggleSkill
    skillIsActive: SkillIsActive
}

export function Skills({ skills,
    toggleSkill,
    skillIsActive
}: SkillsProps) {

    return (
        <section className='m-1 sm:m-8 flex flex-col gap-4 justify-center items-center sm:w-3/4'>
            <h2 className='text-xl font-bold text-slate-800'>Filter by skills</h2>
            <div  
                className='
                    flex flex-wrap justify-center
                    m-2 gap-2 sm:gap-x-6 sm:gap-y-6
                '
            >
                {
                    skills.map((skill, index) => (
                        <SkillBadge skill={skill}
                            toggleSkill={toggleSkill}
                            skillIsActive={skillIsActive}
                            key={index} />
                    ))
                }
            </div>
        </section>
    )
}
