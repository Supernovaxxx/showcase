import { Skill, ToggleSkill, SkillIsActive } from "@/types/core"
import { Badge } from "../ui/badge"


interface SkillProps {
    skill: Skill
    toggleSkill: ToggleSkill
    skillIsActive: SkillIsActive
}

export function SkillBadge({ skill, toggleSkill, skillIsActive }: SkillProps) {
    
    return (
        <Badge onClick={() => toggleSkill(skill)}
            variant={`${skillIsActive(skill) ? 'default' :'outline'}`}
            className='cursor-pointer hover:opacity-80 hover:scale-105 transition-all ease-in-out duration-100 sm:p-2'
        >
            {skill}
        </Badge>
    )
}
