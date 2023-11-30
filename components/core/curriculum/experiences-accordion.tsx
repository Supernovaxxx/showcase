'use client'
import { compareDesc } from 'date-fns'

import { getExperiences } from '@/lib/data'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'


export function ExperiencesAccordion() {
    const experiences = getExperiences()
        .sort((a, b) => compareDesc(new Date(a.start_date), new Date(b.start_date)))

    return (
        <Accordion type='multiple' className='w-1/3 max-w-2xl'>
            {experiences.map((experience, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                        <div className='flex flex-col items-start'>
                            <span className='font-bold text-lg'>{experience.role.slice(2, -2)}</span>
                            <span>{experience.company} - <span className='text-sm font-light'>{experience.start_date} - {experience.end_date}</span></span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <span className='font-bold block'></span>
                        {experience.description}
                        <span className='flex gap-2 flex-wrap py-2'>{experience.skills.map((skill, index) => (
                            <Badge key={index}>{skill}</Badge>
                        ))}</span>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
