import type { VNode } from 'preact'
import type { WidgeterioElement } from './types'
import { upperFirst } from './utils'

interface LeftPanelElementProps {
  element: WidgeterioElement
}

function LeftPanelElement (props: LeftPanelElementProps): VNode {
  function handleDragStart (e: DragEvent): void {
    e.dataTransfer?.setData('id', props.element.id)
  }

  return (
    <button class='left-panel__element' data-widgeterio='' draggable onDragStart={handleDragStart}>
      {upperFirst(props.element.name)}
    </button>
  )
}

export default LeftPanelElement
