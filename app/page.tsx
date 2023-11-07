import { CertificationSection, ContactSection, LearnlogSection } from '@/components/site/sections'
import { ReferencesTable } from '@/components/core/references/table'
import { ThemeToggler } from '@/components/site/theme-toggler'


export default function Home() {

  return (
    <main>
      <ThemeToggler />
      <ReferencesTable />
      {/* <LearnlogSection /> */}
      <CertificationSection />
      <ContactSection />
    </main>
  )
}
