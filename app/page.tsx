import { CertificationSection, ContactSection, LearnlogSection } from '@/components/site/sections'
import { ReferencesTable } from '@/components/core/references/table'
import { ThemeToggler } from '@/components/site/theme-toggler'
import { ScrollProgress } from '@/components/site/scroll-progress'


export default function Home() {

  return (
    <main>
      <ScrollProgress />
      <ThemeToggler />
      <ReferencesTable />
      {/* <LearnlogSection /> */}
      <CertificationSection />
      <ContactSection />
    </main>
  )
}
