import { Skill } from "@/types/core"
import { ToggleSkill, SkillIsActive } from '@/components/skills'
import { Badge } from "@/components/ui/badge"
import { Icon, IconName } from "@/components/icons"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface SkillBadgeProps {
    skill: Skill
    toggleSkill: ToggleSkill
    skillIsActive: SkillIsActive
}

export function SkillBadge({ skill, toggleSkill, skillIsActive }: SkillBadgeProps) {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Badge
                        onClick={() => toggleSkill(skill)}
                        variant={`${skillIsActive(skill) ? 'secondary' : 'outline'}`}
                        className='
                            p-2 sm:p-3
                            cursor-pointer
                            transition-all ease-in-out duration-100
                            hover:opacity-80 hover:scale-105
                        '
                    >
                        <Icon
                            name={skill as IconName}
                            className='
                                w-8 h-8 sm:w-10 sm:h-10
                            '
                        />
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{skill}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
