import { CertificateType, CertificatesProps } from "@/types/certificates"
import { Certificate } from "./certificate"

export default function Certificates({ certificates }: CertificatesProps) {

  return (
    <section className='my-4 mx-8 text-slate-800 flex flex-col gap-4 justify-center items-center w-4/5'>
      <h2 className='text-xl font-bold text-slate-800'>Certificates</h2>
      <div className='flex gap-y-4 flex-wrap justify-evenly'>
        {certificates.map((item: CertificateType) => <Certificate certificate={item} />)}
      </div>
    </section>
  )
}
