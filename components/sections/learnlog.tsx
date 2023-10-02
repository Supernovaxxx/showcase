import { RaindropsPanel } from '@/components/raindrops/panel'

export default function LearnlogSection() {
    
    return (
        <div
        className='
          flex flex-col justify-center items-center
          p-8
          w-100
        '
      >
        <h2
          className='
            text-3xl font-bold text-slate-800
          '
        >
          Learnlog
        </h2>
        <RaindropsPanel />
      </div>
    )
}
