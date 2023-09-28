import Icons, {type IconName} from './icons'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName
}

export function Icon({ name, ...props }: IconProps) {
    const Icon = Icons[name]
    return <Icon {...props} />
}
