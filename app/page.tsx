import { CertificationSection, LearnlogSection } from '@/components/site/sections'
import { ReferencesTable } from '@/components/core/references/table'
import { ContactForm } from '@/components/core/contact/form'


export default function Home() {

  return (
    <main>
      <ReferencesTable />
      {/* <LearnlogSection /> */}
      <CertificationSection />
      <ContactForm />
    </main>
  )
}
