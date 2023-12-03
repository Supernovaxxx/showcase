import { ExperiencesAccordion } from '@/components/core/curriculum'


export function CurriculumSection() {

    return (
        <section className='flex flex-col justify-center items-center p-8 w-100'>
            <h2 className='text-3xl font-bold text-foreground'>
                Curriculum
            </h2>
           <ExperiencesAccordion />
        </section>
    )
}
