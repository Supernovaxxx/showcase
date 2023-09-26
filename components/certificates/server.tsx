import { Certificate, CertificatesProps } from "@/types/certificates"
import { CertificateCard } from "./client"

export function Certificates({ certificates }: CertificatesProps) {

  return (
    <section className='my-4 mx-8 text-slate-800 flex flex-col gap-4 justify-center items-center w-4/5'>
      <h2 className='text-xl font-bold text-slate-800'>Certificates</h2>
      <div className='flex gap-y-4 flex-wrap justify-evenly'>
        {
          certificates.map((item: Certificate, index) => (
            <CertificateCard certificate={item} key={index}/>
          ))
        }
      </div>
    </section>
  )
}
