import { CertificateCard } from '@/components/core/certificates'
import { Certificate } from '@/types/core'


interface CertificatesPanelProps {
  certificates: Certificate[]
}

export function CertificatesPanel({ certificates }: CertificatesPanelProps) {

  return (
    <section
      className='
        flex flex-col justify-center items-center gap-y-2 sm:gap-4
        my-4 mx-2 sm:mx-8
        w-11/12 sm:w-4/5
        text-slate-800
      '
    >
      <div
        className='
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4
          w-full
          '
      >
        {
          certificates.map((item: Certificate, index) => (
            <CertificateCard certificate={item} key={index} />
          ))
        }
      </div>
    </section>
  )
}
