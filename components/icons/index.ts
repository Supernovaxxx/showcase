import { CSS } from './css'
import { Django } from './django'
import { Docker } from './docker'
import { GitHub } from './github'
import { Google } from './google'
import { GraphQL } from './graphql'
import { HTML } from './html'
import { Javascript } from './javascript'
import { LinkedIn } from './linkedin'
import { MongoDB } from './mongodb'
import { NextJS } from './nextjs'
import { NPM } from './npm'
import { Postman } from './postman'
import { Python } from './python'
import { React } from './react'
import { Webpack } from './webpack'

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
