import { CertificationSection, ContactSection, CurriculumSection, LearnlogSection } from '@/components/site/sections'
import { ReferencesTable } from '@/components/core/references/table'
import { ThemeToggler } from '@/components/site/theme-toggler'
import { ScrollProgress } from '@/components/site/scroll-progress'


export default function Home() {

  return (
    <main>
      <ScrollProgress />
      <ThemeToggler />
      <CurriculumSection />
      {/* <LearnlogSection /> */}
      <CertificationSection />
      <ReferencesTable />
      <ContactSection />
    </main>
  )
}
