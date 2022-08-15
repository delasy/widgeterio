import type { VNode } from 'preact'
import type { WidgeterioConfigElement } from './types'

interface SurfaceElementProps {
  element: WidgeterioConfigElement
}

function SurfaceElement (props: SurfaceElementProps): VNode {
  const style = props.element.style ?? {}
  let children: VNode[] | string | null = null

  if (typeof props.element.children !== 'undefined') {
    children = props.element.children.map((child) => {
      return <SurfaceElement key={child._id} element={child} />
    })
  } else if (typeof props.element.innerText !== 'undefined') {
    children = props.element.innerText
  }

  const attributes = {
    className: 'surface__element',
    'data-widgeterio': '',
    style,
    children
  }

  const Tag = props.element.tag

  return (
    <Tag {...attributes} />
  )
}

export default SurfaceElement
