import type { VNode } from 'preact'
import LeftPanelElement from './left-panel-element'
import elements from './elements'

function LeftPanel (_props: {}): VNode {
  return (
    <div class='widgeterio__left-panel left-panel' data-widgeterio=''>
      <div class='left-panel__header' data-widgeterio=''>
        <h5 class='left-panel__headline' data-widgeterio=''>Elements</h5>
      </div>
      <div class='left-panel__body' data-widgeterio=''>
        {elements.map((element) => {
          return <LeftPanelElement key={element.id} element={element} />
        })}
      </div>
    </div>
  )
}

export default LeftPanel
