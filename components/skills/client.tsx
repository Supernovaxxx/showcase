'use client'
import { Skill, ToggleSkill } from "@/types/skills"
import { useState } from "react"

interface SkillProps {
    skill: Skill
    toggleSkill: ToggleSkill
}

export function SkillBadge({ skill, toggleSkill }: SkillProps) {
    const [activeItem, setActiveItem] = useState(false)

    function handleClick() {
        toggleSkill(skill)
        setActiveItem(!activeItem)
    }

    return (
        <div onClick={() => handleClick()}
            className={` ${activeItem ? 'text-white bg-slate-700' : 'text-slate-700 bg-slate-200'} p-4 rounded-xl cursor-pointer flex items-center hover:bg-slate-500 hover:text-white hover:font-light`}>
            <p className='font-extralight'>{skill}</p>
        </div>
    )
}
