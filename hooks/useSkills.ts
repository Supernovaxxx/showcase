import { useEffect, useState } from 'react'

import { Skill } from '@/types/core'


export function useSkills(setFilteredSkills: (selectedSkills: Skill[]) => void) {

    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])

    function toggleSkill(skill: Skill): void {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((selected) => selected !== skill))
        } else {
            setSelectedSkills([...selectedSkills, skill])
        }
    }
    
    useEffect(() => {
        if (typeof setFilteredSkills === 'function') {
            setFilteredSkills(selectedSkills)
        }
    }, [selectedSkills])

    function skillIsActive(skill: Skill): boolean {
        return selectedSkills.includes(skill)
    }

    return { selectedSkills, toggleSkill, skillIsActive }
}
