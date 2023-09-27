import { Certificate, CertificatesProps } from "@/types/core"

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

interface CertificateProps {
    certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateProps) {

    return (
        <div className='w-60 sm:w-72 h-52 sm:h-56'>
            <div className='p-4 rounded-xl bg-slate-700 text-white flex flex-col w-full h-full hover:bg-slate-500 justify-between'>
                <div className='mt-2'>
                    <p className='font-extralight text-xs sm:text-sm flex justify-between'>
                        {certificate.date}
                    </p>
                    <p className='font-extrabold text-lg sm:text-2xl py-1'>
                        {certificate.title}
                    </p>
                    <p className='font-extralight text-xs sm:text-sm'>
                        By {certificate.issuer.title}
                    </p>
                </div>
                <div className='font-extralight mt-2 py-2 text-xs sm:text-sm justify-self-end'>
                    {
                        certificate.skills.map((skill) => (
                            <span className='m-1 p-1 border rounded-sm'>{skill}</span>
                        ))
                    }</div>
            </div>
        </div>
    )
}
