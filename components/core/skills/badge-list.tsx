import { Badge } from '@/components/ui/badge'
import { HorizontalInfiniteLoop, HoverMotion } from '@/components/site/animations'
import { Logo, LogoName } from '@/components/site/icons'
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

    const duplicateSkills = [...skills, ...skills]

    return (
        <HorizontalInfiniteLoop>
            {
                duplicateSkills.map((skill, index) => (
                    <SkillBadge skill={skill}
                        toggleSkill={toggleSkill}
                        skillIsActive={skillIsActive}
                        key={index} />
                ))
            }
        </HorizontalInfiniteLoop>
    )
}

interface SkillBadgeProps {
    skill: Skill
    toggleSkill: ToggleSkill
    skillIsActive: SkillIsActive
}

export function SkillBadge({ skill, toggleSkill, skillIsActive }: SkillBadgeProps) {

    return (
        <HoverMotion>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Badge
                            onClick={() => toggleSkill(skill)}
                            variant={`${skillIsActive(skill) ? 'secondary' : 'outline'}`}
                            className='
                            m-4
                            p-2 sm:p-3
                            cursor-pointer
                            transition-all ease-in-out duration-100
                            hover:opacity-80 hover:scale-105
                        '>
                            <Logo
                                name={skill as LogoName}
                                className='w-8 h-8'
                            />
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{skill}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </HoverMotion>
    )
}
