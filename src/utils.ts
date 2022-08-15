import { WidgeterioConfigFrame } from './types'

export function findFrameById (frames: WidgeterioConfigFrame[], id: string): WidgeterioConfigFrame {
  for (const frame of frames) {
    if (frame._id === id) {
      return frame
    }
  }

  throw new Error('tried finding non existing frame')
}

export function locateFrameId (frames: WidgeterioConfigFrame[], x: number, y: number, scale: number): string | null {
  const currentY = 0
  let currentX = 0

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i] as WidgeterioConfigFrame

    if (
      currentX * scale <= x && x <= (currentX + frame.width) * scale &&
      currentY * scale <= y && y <= (currentY + frame.height) * scale
    ) {
      return frame._id
    }

    currentX += frame.width + 100
  }

  return null
}

export function upperFirst (val: string): string {
  if (val.length === 0) {
    return ''
  }

  return val.slice(0, 1).toUpperCase() + val.slice(1)
}
