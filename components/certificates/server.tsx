import { Certificate, CertificatesProps } from "@/types/core"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { convertDateFromIsoToMonthYear } from "@/lib/utils"

export function Certificates({ certificates }: CertificatesProps) {

  return (
    <section className='my-4 mx-2 sm:mx-8 text-slate-800 flex flex-col gap-y-2 sm:gap-4 justify-center items-center w-11/12 sm:w-4/5'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
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
    <Card>
      <CardHeader>
        <CardDescription>
          {convertDateFromIsoToMonthYear(certificate.date)}
        </CardDescription>
        <CardTitle>
          {certificate.title}
        </CardTitle>
        <CardDescription>
          {certificate.issuer.title}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {
          certificate.skills.map((skill) => (
            <Badge variant="outline">
              {skill}
            </Badge>
          ))
        }
      </CardFooter>
    </Card>
  )
}
