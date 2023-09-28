import { Certificate, CertificatesProps } from "@/types/core"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertDateFromIsoToMonthYear } from "@/lib/utils"
import { Icon } from "../icon"
import { IconName } from "../icons"

export function Certificates({ certificates }: CertificatesProps) {

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

interface CertificateProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateProps) {

  return (
    <Card
      className='
        flex flex-col justify-between
      '
    >
      <CardHeader>
        <CardDescription>
          {convertDateFromIsoToMonthYear(certificate.date)}
        </CardDescription>
        <CardTitle>
          {certificate.title}
        </CardTitle>
        <CardDescription>
          {certificate.issuer.title}
          {' '}
          <Icon name={certificate.issuer.title as IconName}
            className='
              inline
              w-3 h-3 sm:w-4 sm:h-4 
            '
          />
        </CardDescription>
      </CardHeader>
      <CardFooter
        className='
          flex flex-wrap gap-2
        '
      >
        {
          certificate.skills.map((skill) => (
            <Icon name={skill as IconName}
              className='
                inline pr-1
                w-7 h-7 
                sm:w-8 sm:h-8 
              '
            />
          ))
        }
      </CardFooter>
    </Card>
  )
}
