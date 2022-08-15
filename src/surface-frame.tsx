import type { VNode } from 'preact'
import type { WidgeterioConfigFrame } from './types'
import SurfaceElement from './surface-element'

interface SurfaceFrameProps {
  frame: WidgeterioConfigFrame
  selected: boolean
}

function SurfaceFrame (props: SurfaceFrameProps): VNode {
  const attrs = {
    className: 'surface__frame' + (props.selected ? ' surface__frame--selected' : ''),
    'data-widgeterio': '',
    style: {
      ...props.frame.style,
      height: props.frame.height,
      width: props.frame.width
    }
  }

  return (
    <div {...attrs}>
      {props.frame.children.map((child) => {
        return <SurfaceElement key={child._id} element={child} />
      })}
    </div>
  )
}

export default SurfaceFrame
