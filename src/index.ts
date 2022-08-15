import type { WidgeterioConfig } from './types'
import Widgeterio from './widgeterio'

const config: WidgeterioConfig = {
  frames: []
}

const widgeterio = new Widgeterio(config)

widgeterio.mount('#root')
widgeterio.unmount()
widgeterio.mount('#root')
