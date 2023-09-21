import { Certificate, CertificatesProps } from "@/types/certificates"

export default function Certificates({ certificates }: CertificatesProps) {

  return (
    <section className='my-4 mx-8 text-slate-800 flex flex-col gap-4 justify-center items-center w-4/5'>
      <h2 className='text-xl font-bold text-slate-800'>Certificates</h2>
      <div className='flex gap-y-4 flex-wrap justify-between'>
        {certificates.map((item: Certificate) =>
          <div className='p-4 rounded-xl bg-slate-700 text-white w-72 flex flex-col flex-wrap hover:bg-slate-500'>
            <p className='font-extrabold'>{item.title}</p>
            <p className='font-extralight'>{item.issuerName}</p>
            <p className='font-extralight text-xs'>{item.date}</p>
            <p className='font-extralight mt-2'>{item.skills}</p>
          </div>)}
      </div>
    </section>
  )
}
