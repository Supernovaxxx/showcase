import { Skill, ToggleSkill } from "@/types/skills"
import { SkillBadge } from "./skill-badge"

interface SkillsProps {
    skills: Skill[]
    toggleSkill: ToggleSkill
}

export default function Skills({ skills, toggleSkill }: SkillsProps) {

    return (
        <section className='m-8 flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-xl font-bold text-slate-800'>Skills</h2>
            <div className='flex gap-2 m-2 flex-wrap'>
                {
                    skills.map((skill: string, index) => (
                        <SkillBadge skill={skill} toggleSkill={toggleSkill} key={index} />
                    ))
                }
            </div>
        </section>
    )
}
