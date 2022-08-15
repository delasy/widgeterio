import type { TargetedEvent } from 'preact/compat'
import type { VNode } from 'preact'
import type { WidgeterioConfig } from './types'
import { findFrameById } from './utils'

interface RightPanelProps {
  config: WidgeterioConfig
  onConfigChange: (id: WidgeterioConfig) => any
  selectedFrame: string | null
}

function RightPanel (props: RightPanelProps): VNode {
  let content: VNode | null = null

  function handleFrameChange (id: string, key: string, val: string): void {
    if (
      key === 'className' ||
      key === 'id' ||
      key === 'onClick'
    ) {
      findFrameById(props.config.frames, id)[key] = val
    } else if (key === 'height' || key === 'width') {
      findFrameById(props.config.frames, id)[key] = parseInt(val)
    } else if (key === 'style.backgroundColor') {
      findFrameById(props.config.frames, id).style = {
        ...findFrameById(props.config.frames, id).style,
        backgroundColor: val
      }
    }

    props.onConfigChange({ ...props.config })
  }

  if (props.selectedFrame !== null) {
    const frame = findFrameById(props.config.frames, props.selectedFrame)

    content = (
      <>
        <div>
          <h5>Frame</h5>
          <p>{props.selectedFrame}</p>
        </div>
        <div>
          <h6>General</h6>
          <div>
            <label>Id</label>
            <input
              onChange={(e: TargetedEvent<HTMLInputElement, Event>) => {
                handleFrameChange(frame._id, 'id', e.currentTarget.value)
              }}
              value={frame.id ?? ''}
            />
          </div>
          <div>
            <label>Class Name</label>
            <input
              onChange={(e: TargetedEvent<HTMLInputElement, Event>) => {
                handleFrameChange(frame._id, 'className', e.currentTarget.value)
              }}
              value={frame.className ?? ''}
            />
          </div>
          <div>
            <label>Width</label>
            <input
              onChange={(e: TargetedEvent<HTMLInputElement, Event>) => {
                handleFrameChange(frame._id, 'width', e.currentTarget.value)
              }}
              value={frame.width ?? ''}
            />
          </div>
          <div>
            <label>Height</label>
            <input
              onChange={(e: TargetedEvent<HTMLInputElement, Event>) => {
                handleFrameChange(frame._id, 'height', e.currentTarget.value)
              }}
              value={frame.height ?? ''}
            />
          </div>
        </div>
        <div>
          <h6>Styles</h6>
          <div>
            <label>Background Color</label>
            <input
              onChange={(e: TargetedEvent<HTMLInputElement, Event>) => {
                handleFrameChange(frame._id, 'style.backgroundColor', e.currentTarget.value)
              }}
              value={frame.style?.backgroundColor ?? ''}
            />
          </div>
        </div>
        <div>
          <h6>Events</h6>
          <div>
            <label>On Click</label>
            <textarea
              onChange={(e: TargetedEvent<HTMLTextAreaElement, Event>) => {
                handleFrameChange(frame._id, 'onClick', e.currentTarget.value)
              }}
              value={frame.onClick ?? ''}
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <div class='widgeterio__right-panel right-panel' data-widgeterio=''>
      {content}
    </div>
  )
}

export default RightPanel
