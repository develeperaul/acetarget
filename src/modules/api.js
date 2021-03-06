// import * as Namespaces from './api/'
const fakedata = false

import * as Namespaces from './api/index'

class Api {
  constructor (namespace) {
    this.Namespaces = Namespaces
    this.namespace = namespace

    if (!this.Namespaces[this.namespace]) {
      return
    }
    this.injected = new this.Namespaces[this.namespace](fakedata)
  }

  async call (callable, data) {
    return await this.injected[callable](data)
  }
}
export default Api
