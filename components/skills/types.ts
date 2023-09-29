import { Skill } from "@/types/core/skills"

export type ToggleSkill = (item: string) => void
export type SkillIsActive = (skill:Skill) => boolean
