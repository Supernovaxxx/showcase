import { Skill } from "@/types/core"
import { useState } from "react"

export function useSkills() {

    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])

    function toggleSkill(skill: Skill): void {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((selected) => selected !== skill))
        } else {
            setSelectedSkills([...selectedSkills, skill])
        }
    }

    return { selectedSkills, toggleSkill }
}
