const information = {
    state: {
        showAside: false, // 是否显示侧边栏
        searchRender: true, //用于刷新搜索
    },
    getters: {
        showAside: state => {
            let showAside = state.showAside
            return showAside
        },
        searchRender: state => {
            let searchRender = state.searchRender
            return searchRender
        },
    },
    mutations: {
        setShowAside: (state, showAside) => {
            state.showAside = showAside
        },
        setSearchRender: (state, searchRender) => {
            state.searchRender = searchRender
        },
    },
    actions: {}
}

export default information