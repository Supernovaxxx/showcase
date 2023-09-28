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
        <section
            className='
                flex flex-col justify-center items-center gap-4
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
                    flex flex-wrap justify-center gap-2 sm:gap-x-6 sm:gap-y-6
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
