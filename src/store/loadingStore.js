import { makeAutoObservable } from 'mobx'
class LoadingStore {
    loading = false //页面加载效果
    constructor() {
        makeAutoObservable(this);
    }
    changeLoading(data) {
        this.loading = data
    }
}
const loading = new LoadingStore();
export default loading