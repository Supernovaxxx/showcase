import { ReferencesPanel } from '@/components/core/references'


export function LearnlogSection() {
    
    return (
        <div className='
          flex flex-col justify-center items-center
          p-8 w-100
        '>
        <h2 className='text-3xl font-bold text-foreground'>
          Learnlog
        </h2>
        <ReferencesPanel />
      </div>
    )
}
