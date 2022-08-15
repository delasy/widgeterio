import type { WidgeterioElement } from './types'

const elements: WidgeterioElement[] = [
  {
    id: 'frame',
    name: 'Frame',
    defaultValue: {
      tag: 'div'
    }
  },
  {
    id: 'container',
    name: 'Container',
    defaultValue: {
      tag: 'div',
      style: {
        backgroundColor: '#DDDDDD',
        paddingBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px'
      }
    }
  },
  {
    id: 'button',
    name: 'Button',
    defaultValue: {
      tag: 'button',
      innerText: 'Button'
    }
  }
]

export default elements
