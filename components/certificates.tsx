import { Certificate, CertificatesProps } from "@/types/certificates"

interface CertificateProps {
  certificate: Certificate
}

export default function Certificates({ certificates }: CertificatesProps) {

  return (
    <section className='my-4 mx-8 text-slate-800 flex flex-col gap-4 justify-center items-center w-4/5'>
      <h2 className='text-xl font-bold text-slate-800'>Certificates</h2>
      <div className='flex gap-y-4 flex-wrap justify-between'>
        {certificates.map((item: Certificate) => <Certificate certificate={item} />)}
      </div>
    </section>
  )
}

export function Certificate({ certificate }: CertificateProps) {

  return (
    <div className='p-4 rounded-xl bg-slate-700 text-white w-72 flex flex-col flex-wrap hover:bg-slate-500' >
      <p className='font-extrabold'>{certificate.title}</p>
      <p className='font-extralight'>{certificate.issuer.title}</p>
      <p className='font-extralight text-xs'>{certificate.date}</p>
      <p className='font-extralight mt-2'>{certificate.skills}</p>
    </div>
  )
}
