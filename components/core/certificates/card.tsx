'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.5 1']
  })
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: scrollYProgress }}
    >
      <Card className='flex flex-col justify-between h-full'>
        <CardHeader className='min-h-[9.25rem]'>
          <CardDescription>
            {convertDateFromIsoToMonthYear(certificate.date)}
          </CardDescription>
          <CardTitle>
            {certificate.title}
          </CardTitle>
          <CardDescription>
            {certificate.issuer}
            {' '}
            <Logo name={certificate.issuer as LogoName} className='inline w-3 h-3 sm:w-4 sm:h-4' />
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex flex-wrap gap-2'>
          {
            certificate.skills.map((skill, index) => (
              <Logo name={skill as LogoName}
                key={index}
                className='inline w-8 h-8' />
            ))
          }
        </CardFooter>
      </Card>
    </motion.div>
  )
}
