import * as Logos from './logos'

export type LogoName = keyof typeof Logos

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
    name: LogoName
}

export function Logo({ name, ...props }: LogoProps) {
    const Icon = Logos[name]
    return <Icon {...props} />
}
