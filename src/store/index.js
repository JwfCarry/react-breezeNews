import React from 'react'
import collapsedStore from './collapsedStore'
import loadingStore from './loadingStore'
class RootStore {
    constructor() {
        this.collapsedStore = collapsedStore
        this.loadingStore = loadingStore
    }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)
export { useStore }