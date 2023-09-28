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
        <section
            className='
                flex flex-col justify-center items-center gap-4
                m-1 sm:m-8
                sm:w-3/4
            '
        >
            <h2
                className='
                    text-xl font-bold text-slate-800
                '
            >
                Filter by skills
            </h2>
            <div  
                className='
                    flex flex-wrap justify-center gap-2 sm:gap-x-6 sm:gap-y-6
                    m-2
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
