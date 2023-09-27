import { Skill, ToggleSkill } from "@/types/core"
import { Badge } from "../ui/badge"


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
        <Badge onClick={() => toggleSkill(skill)}
            variant={`${isActive(skill) ? 'default' :'outline'}`}
            className='cursor-pointer hover:opacity-80 hover:scale-105 transition-all ease-in-out duration-100 sm:p-2'
        >
            {skill}
        </Badge>
    )
}
