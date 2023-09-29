import { Certificate } from "@/types/core/certificates"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertDateFromIsoToMonthYear } from "@/lib/utils"
import { Icon, IconName } from "@/components/icons"

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
