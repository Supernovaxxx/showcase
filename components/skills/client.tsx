import { Skill, ToggleSkill } from "@/types/core"

interface SkillProps {
    skill: Skill
    selectedSkills: Skill[]
    toggleSkill: ToggleSkill
}

export function SkillBadge({ skill, selectedSkills, toggleSkill }: SkillProps) {
    
    function isActive(skill: Skill):boolean {
        return selectedSkills.includes(skill)
    }
    
    return (
        <div onClick={() => toggleSkill(skill)}
        className={`${isActive(skill) ? 'text-white bg-slate-700' : 'text-slate-700 bg-slate-200'} p-4 rounded-xl cursor-pointer flex items-center hover:bg-slate-500 hover:text-white hover:font-light`}>
            <p className='font-extralight'>{skill}</p>
        </div>
    )
}
