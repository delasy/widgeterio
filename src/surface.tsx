import type { CSSProperties } from 'preact/compat'
import type { VNode } from 'preact'
import type { WidgeterioConfig, WidgeterioElement } from './types'
import SurfaceFrame from './surface-frame'
import elements from './elements'
import { findFrameById, locateFrameId } from './utils'
import { useEffect, useRef, useState } from 'preact/hooks'

interface SurfaceProps {
  config: WidgeterioConfig
  genId: () => string
  onConfigChange: (id: WidgeterioConfig) => any
  onFrameSelect: (id: string | null) => any
  selectedFrame: string | null
}

function Surface (props: SurfaceProps): VNode {
  const rootRef = useRef<HTMLDivElement>(null)

  const [setInitialPosition, setSetInitialPosition] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (rootRef.current !== null && !setInitialPosition) {
      const nodeRect = rootRef.current.getBoundingClientRect()
      const translateX = Math.floor(nodeRect.width / 2 + position.x)
      const translateY = Math.floor(nodeRect.height / 2 + position.y)

      setPosition({ x: translateX, y: translateY })

      if (nodeRect.width !== 0 || nodeRect.height !== 0) {
        setSetInitialPosition(true)
      }
    }
  })

  function handleDragOver (e: DragEvent): void {
    e.preventDefault()
  }

  function handleDrop (e: DragEvent): void {
    e.preventDefault()

    const elementId = e.dataTransfer?.getData('id') ?? ''

    if (rootRef.current === null || !elements.map(it => it.id).includes(elementId)) {
      return
    }

    if (elementId === 'frame') {
      props.onConfigChange({
        ...props.config,
        frames: [
          ...props.config.frames,
          {
            _id: props.genId(),
            children: [],
            height: 640,
            width: 360,
            style: {
              backgroundColor: '#FFFFFF'
            }
          }
        ]
      })

      return
    }

    const rootRect = rootRef.current.getBoundingClientRect()

    const frameId = locateFrameId(
      props.config.frames,
      e.clientX - rootRect.left - position.x,
      e.clientY - rootRect.top - position.y,
      scale
    )

    if (frameId === null) {
      alert('Please place element within frame')
      return
    }

    const element = elements.find(it => it.id === elementId) as WidgeterioElement

    findFrameById(props.config.frames, frameId).children.push({
      ...element.defaultValue,
      _id: props.genId()
    })

    props.onConfigChange({
      ...props.config
    })
  }

  function handleMouseDown (e: MouseEvent): void {
    e.preventDefault()

    if (rootRef.current === null) {
      return
    }

    const rootRect = rootRef.current.getBoundingClientRect()

    const frameId = locateFrameId(
      props.config.frames,
      (e.clientX - rootRect.left) - position.x,
      (e.clientY - rootRect.top) - position.y,
      scale
    )

    props.onFrameSelect(frameId)
  }

  function handleWheel (e: WheelEvent): void {
    e.preventDefault()

    if (e.ctrlKey) {
      setScale(scale - e.deltaY * 0.01)
    } else {
      setPosition({
        x: position.x - e.deltaX * 2,
        y: position.y - e.deltaY * 2
      })
    }
  }

  const canvasStyle: CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `scale(${scale})`
  }

  return (
    <div
      class='widgeterio__surface surface'
      data-widgeterio=''
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      ref={rootRef}
    >
      <div class='surface__canvas' data-widgeterio='' style={canvasStyle}>
        {props.config.frames.map((frame) => {
          return <SurfaceFrame key={frame._id} frame={frame} selected={props.selectedFrame === frame._id} />
        })}
      </div>
    </div>
  )
}

export default Surface
