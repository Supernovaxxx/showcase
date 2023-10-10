import { Raindrop } from '@/types/data/raindrops'


export interface Certificate {
    title: string,
    date: string, // TODO: define date type (mm/dd/aaaa | mm/aaaa)
    skills: Skill[],
    issuer: {
        title: string,
        logo: string
    },
    imageUrl: string,
    certificateUrl: string
}

export type Reference = Raindrop

export type Skill = string

