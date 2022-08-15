import type { WidgeterioConfig } from './types'
import App from './app'
import { render } from 'preact'

class Widgeterio {
  #allIds: string[] = []
  readonly #config: WidgeterioConfig
  _rootEl: HTMLElement | null = null

  constructor (config: WidgeterioConfig) {
    this.#config = config

    // todo enhance with elements
    for (const frame of config.frames) {
      this.#allIds.push(frame._id)
    }
  }

  mount (src: string): void {
    if (this._rootEl !== null) {
      throw new Error('tried mounting on mounted')
    }

    this._rootEl = document.querySelector(src)

    if (this._rootEl === null) {
      throw new Error('container not found')
    }

    render((
      <App
        config={this.#config}
        genId={this.#genId.bind(this)}
      />
    ), this._rootEl)
  }

  unmount (): void {
    if (this._rootEl === null) {
      throw new Error('tried unmounting on not mounted')
    }

    this._rootEl.innerHTML = ''
    this._rootEl = null
  }

  #genId (): string {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const alphaNumLength = alphaNum.length
    let result = alpha.charAt(Math.floor(Math.random() * alpha.length))

    for (let i = 0; i < 7; i++) {
      result += alphaNum.charAt(Math.floor(Math.random() * alphaNumLength))
    }

    if (!this.#allIds.includes(result)) {
      this.#allIds.push(result)
      return result
    }

    return this.#genId()
  }
}

export default Widgeterio
