'use client'
import Image from "next/image"
import { useState } from "react"
import { CertificateType } from "@/types/certificates"

interface CertificateProps {
    certificate: CertificateType
}

export function Certificate({ certificate }: CertificateProps) {
    const [showImage, setShowImage] = useState(false)

    function toggle() {
        console.log(showImage)
        showImage ? setShowImage(false) : setShowImage(true)
    }

    return (
        <button onClick={() => toggle()}>
            {
                showImage
                    ? <Image src={certificate.imageUrl} alt='Picture of certificate' width={288} height={244} className='p-0 rounded-xl bg-slate-700 text-white w-72 flex flex-col flex-wrap' />
                    : <div className='p-4 rounded-xl bg-slate-700 text-white w-72 h-56 flex flex-col  hover:bg-slate-500' >
                        <p className='font-extrabold'>{certificate.title}</p>
                        <p className='font-extralight'>{certificate.issuer.title}</p>
                        <p className='font-extralight text-xs'>{certificate.date}</p>
                        <p className='font-extralight mt-2'>{certificate.skills}</p>
                    </div>
            }
        </button>
    )
}
