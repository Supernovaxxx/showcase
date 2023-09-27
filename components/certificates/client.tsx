'use client'
import Image from "next/image"
import { useState } from "react"
import { Certificate } from "@/types/core"

interface CertificateProps {
    certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateProps) {
    const [activeCard, setActiveCard] = useState(false)
    function handleFlip() {
        setActiveCard(!activeCard)
    }

    return (
        <div onClick={handleFlip} className={`transition-all duration-1000 preserve-3d ease-in-out cursor-pointer m-2 w-60 sm:w-72 h-52 sm:h-56 ${activeCard ? 'my-rotate-y-180' : ''}`}>
            <div className='relative backface-hidden p-4 rounded-xl bg-slate-700 text-white flex flex-col w-full h-full hover:bg-slate-500 justify-between'>
                <div className='mt-2'>
                    <p className='font-extralight text-xs sm:text-sm'>{certificate.date}</p>
                    <p className='font-extrabold text-lg sm:text-2xl py-1'>{certificate.title}</p>
                    <p className='font-extralight text-xs sm:text-sm'>By {certificate.issuer.title}</p>
                </div>
                <div className='font-extralight mt-2 py-2 text-xs sm:text-sm justify-self-end'>
                    {
                        certificate.skills.map((skill) => (
                            <span className='m-1 p-1 border rounded-sm'>{skill}</span>
                        ))
                    }</div>
            </div>

            <Image className='absolute top-0 my-rotate-y-180 backface-hidden p-0 rounded-xl bg-slate-700 text-white flex flex-col flex-wrap w-full h-full'
                src={certificate.imageUrl} alt='Picture of certificate' width={288} height={244} />
        </div>
    )
}
