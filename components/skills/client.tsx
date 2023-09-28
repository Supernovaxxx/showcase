import { Skill, ToggleSkill, SkillIsActive } from "@/types/core"
import { Badge } from "../ui/badge"
import { Icon } from "../icon"
import { IconName } from "../icons"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface SkillProps {
    skill: Skill
    toggleSkill: ToggleSkill
    skillIsActive: SkillIsActive
}

export function SkillBadge({ skill, toggleSkill, skillIsActive }: SkillProps) {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Badge
                        onClick={() => toggleSkill(skill)}
                        variant={`${skillIsActive(skill) ? 'secondary' : 'outline'}`}
                        className='
                            sm:p-3
                            cursor-pointer
                            transition-all ease-in-out duration-100
                            hover:opacity-80 hover:scale-105
                        '
                    >
                        <Icon
                            name={skill as IconName}
                            className='
                                w-8 h-8 sm:w-12 sm:h-12
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
