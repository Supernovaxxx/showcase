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
            <div className='flex gap-2 sm:gap-1 sm:gap-x-4 sm:gap-y-2 m-2 flex-wrap justify-center'>
                {
                    skills.map((skill: string, index) => (
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
