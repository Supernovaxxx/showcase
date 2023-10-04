import { SkillBadge, ToggleSkill, SkillIsActive } from '@/components/core/skills'
import { Skill } from '@/types/core'


interface SkillBadgesListProps {
    skills: Skill[]
    toggleSkill: ToggleSkill
    skillIsActive: SkillIsActive
}

export function SkillBadgesList({ skills,
    toggleSkill,
    skillIsActive
}: SkillBadgesListProps) {

    return (
        <section
            className='
                flex flex-col justify-center items-center gap-1
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
                    flex flex-wrap justify-start gap-2 sm:gap-2
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
