import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Logo, LogoName } from '@/components/site/icons'
import { convertDateFromIsoToMonthYear } from '@/lib/utils'
import { Certificate } from '@/types/core'


interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {

  return (
    <Card
      className='
          flex flex-col justify-between
        '
    >
      <CardHeader className='min-h-[9.25rem]'>
        <CardDescription>
          {convertDateFromIsoToMonthYear(certificate.date)}
        </CardDescription>
        <CardTitle>
          {certificate.title}
        </CardTitle>
        <CardDescription>
          {certificate.issuer.title}
          {' '}
          <Logo name={certificate.issuer.title as LogoName}
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
          certificate.skills.map((skill, index) => (
            <Logo name={skill as LogoName}
              key={index}
              className='
                  inline
                  w-8 h-8 
                '
            />
          ))
        }
      </CardFooter>
    </Card>
  )
}
