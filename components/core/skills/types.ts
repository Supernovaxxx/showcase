import { Skill } from '@/types/core'


export type ToggleSkill = (item: string) => void
export type SkillIsActive = (skill:Skill) => boolean
