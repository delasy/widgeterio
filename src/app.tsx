import type { VNode } from 'preact'
import type { WidgeterioConfig } from './types'
import LeftPanel from './left-panel'
import RightPanel from './right-panel'
import Surface from './surface'
import { useState } from 'preact/hooks'

interface AppProps {
  config: WidgeterioConfig
  genId: () => string
}

function App (props: AppProps): VNode {
  const [config, setConfig] = useState(props.config)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)

  function handleConfigChange (config: WidgeterioConfig): void {
    setConfig(config)
  }

  function handleFrameSelect (id: string | null): void {
    setSelectedFrame(id)
    console.log('changed selectedFrame:', id)
  }

  return (
    <div className='widgeterio' data-widgeterio=''>
      <Surface
        config={config}
        genId={props.genId}
        onConfigChange={handleConfigChange}
        onFrameSelect={handleFrameSelect}
        selectedFrame={selectedFrame}
      />
      <LeftPanel />
      <RightPanel
        config={config}
        selectedFrame={selectedFrame}
        onConfigChange={handleConfigChange}
      />
    </div>
  )
}

export default App
