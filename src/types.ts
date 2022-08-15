import type { CSSProperties } from 'preact/compat'

export interface WidgeterioConfig {
  frames: WidgeterioConfigFrame[]
}

export interface WidgeterioConfigElement {
  _id: string
  tag: string
  children?: WidgeterioConfigElement[]
  className?: string
  id?: string
  innerText?: string
  onClick?: string
  style?: CSSProperties
}

export type WidgeterioConfigFrame = Omit<WidgeterioConfigElement, 'tag'> & {
  width: number
  height: number
  children: WidgeterioConfigElement[]
}

export interface WidgeterioElement {
  id: string
  name: string
  defaultValue: Omit<WidgeterioConfigElement, '_id'>
}
