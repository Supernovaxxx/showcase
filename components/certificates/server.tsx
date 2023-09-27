import { Certificate, CertificatesProps } from "@/types/core"
import { CertificateCard } from "./client"

export function Certificates({ certificates }: CertificatesProps) {

  return (
    <section className='my-4 mx-8 text-slate-800 flex flex-col gap-y-2 sm:gap-4 justify-center items-center w-4/5'>
      <div className='flex sm:gap-y-4 flex-wrap justify-evenly'>
        {
          certificates.map((item: Certificate, index) => (
            <CertificateCard certificate={item} key={index} />
          ))
        }
      </div>
    </section>
  )
}
