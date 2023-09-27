import { Certificate, CertificatesProps } from "@/types/core"
import { CertificateCard } from "./client"

export function Certificates({ certificates }: CertificatesProps) {

  return (
    <section className='my-4 mx-2 sm:mx-8 text-slate-800 flex flex-col gap-y-2 sm:gap-4 justify-center items-center w-11/12 sm:w-4/5'>
      <div className='grid grid-cols-1 min-[850px]:grid-cols-2 xl:grid-cols-3 gap-4'>
        {
          certificates.map((item: Certificate, index) => (
            <CertificateCard certificate={item} key={index} />
          ))
        }
      </div>
    </section>
  )
}
