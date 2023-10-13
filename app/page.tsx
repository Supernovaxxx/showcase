import { CertificationSection, LearnlogSection } from '@/components/site/sections'
import { ReferencesTable } from '@/components/core/references/table'


export default async function Home() {

  return (
    <main>
      <ReferencesTable />
      <LearnlogSection />
      <CertificationSection />
    </main>
  )
}
