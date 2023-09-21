import { CertificatesProps } from "@/types/certificates"

export default function TechStack({ certificates }: CertificatesProps) {
    const skills = [...new Set(certificates
        .map((item) => item.skills)
        .flat())]
    
    return (
        <section className='m-8 flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-xl font-bold text-slate-800'>Tech stack</h2>
            <div className='flex gap-2 m-2'>
                {skills.map((item: string) =>
                    <div className='p-4 rounded-xl text-slate-700 bg-slate-200 flex items-center hover:bg-slate-700 hover:text-white hover:font-light'>
                        <p className='font-extralight'>{item}</p>
                    </div>)}
            </div>
        </section>
    )
}
