import { makeAutoObservable } from 'mobx'
class CollapsedStore {
    collapsed = false;
    constructor() {
        makeAutoObservable(this);
    }
    //修改侧边栏状态
    changeCollapsed() {
        this.collapsed = !this.collapsed
    }
}
const collapsed = new CollapsedStore();
export default collapsed