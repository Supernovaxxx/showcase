import { Badge } from '@/components/ui/badge'
import { Icon, IconName } from '@/components/site/icons'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Skill } from '@/types/core'

import { ToggleSkill, SkillIsActive } from './index'


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
        <>
            {
                skills.map((skill, index) => (
                    <SkillBadge skill={skill}
                        toggleSkill={toggleSkill}
                        skillIsActive={skillIsActive}
                        key={index} />
                ))
            }
        </>
    )
}

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
                                w-8 h-8
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
