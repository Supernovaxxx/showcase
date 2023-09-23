'use client'
import Image from "next/image"
import { useState } from "react"
import { CertificateType } from "@/types/certificates"

interface CertificateProps {
    certificate: CertificateType
}

export function Certificate({ certificate }: CertificateProps) {
    const [activeCard, setActiveCard] = useState(false)
    function handleFlip() {
        setActiveCard(!activeCard)
    }

    return (
        <div onClick={handleFlip} className={`transition-all duration-1000 preserve-3d ease-in-out cursor-pointer w-72 h-56 ${activeCard ? 'my-rotate-y-180' : ''}`}>
            <div className='relative backface-hidden p-4 rounded-xl bg-slate-700 text-white flex flex-col w-full h-full hover:bg-slate-500' >
                <p className='font-extrabold'>{certificate.title}</p>
                <p className='font-extralight'>{certificate.issuer.title}</p>
                <p className='font-extralight text-xs'>{certificate.date}</p>
                <p className='font-extralight mt-2'>{certificate.skills}</p>
            </div>

            <Image className='absolute top-0 my-rotate-y-180 backface-hidden p-0 rounded-xl bg-slate-700 text-white flex flex-col flex-wrap w-full h-full'
                src={certificate.imageUrl} alt='Picture of certificate' width={288} height={244} />
        </div>
    )
}
