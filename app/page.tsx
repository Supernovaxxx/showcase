import { Certificate } from '@/types/certificates'
import data from '@/data/certificates.json'
import Certificates from '@/components/certificates'
import TechStack from '@/components/tech-stack'

export default function Home() {
  let certificates: Certificate[] = data

  return (
    <div className='w-100 flex flex-col justify-center items-center'>
        <TechStack certificates={certificates} />
        <Certificates certificates={certificates} />
    </div>
  )
}
