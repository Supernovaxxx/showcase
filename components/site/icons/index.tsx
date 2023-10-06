export * as LucideIcons from 'lucide-react'

import { CSS } from '@/components/site/icons/css'
import { Django } from '@/components/site/icons/django'
import { Docker } from '@/components/site/icons/docker'
import { GitHub } from '@/components/site/icons/github'
import { Google } from '@/components/site/icons/google'
import { GraphQL } from '@/components/site/icons/graphql'
import { HTML } from '@/components/site/icons/html'
import { Javascript } from '@/components/site/icons/javascript'
import { LinkedIn } from '@/components/site/icons/linkedin'
import { MongoDB } from '@/components/site/icons/mongodb'
import { NextJS } from '@/components/site/icons/nextjs'
import { NPM } from '@/components/site/icons/npm'
import { Postman } from '@/components/site/icons/postman'
import { Python } from '@/components/site/icons/python'
import { React } from '@/components/site/icons/react'
import { Webpack } from '@/components/site/icons/webpack'

export { ExternalDomainFavicon } from '@/components/site/icons/externalDomainFavicon'

const Icons = {
    CSS,
    Django,
    Docker,
    GitHub,
    Google,
    GraphQL,
    HTML,
    Javascript,
    LinkedIn,
    MongoDB,
    NextJS,
    NPM,
    Postman,
    Python,
    React,
    Webpack
}

export default Icons

export type IconName = keyof typeof Icons

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName
}

export function Icon({ name, ...props }: IconProps) {
    const Icon = Icons[name]
    return <Icon {...props} />
}
