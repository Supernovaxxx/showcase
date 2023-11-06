import { CertificationSection, ContactForm, LearnlogSection } from '@/components/site/sections'
import { ReferencesTable } from '@/components/core/references/table'


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
