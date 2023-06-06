export const mixin = {

    methods: {
        //立刻播放音乐
        toplay(song) {
            this.$store.commit('setIsPlay', true);
            this.$store.commit('setId', song.id); //歌曲id
            this.$store.commit('setPicUrl', song.cover_path); //歌曲封面
            this.$store.commit('setUrl', song.music_path); //歌曲url
            this.$store.commit('setTitle', song.music_name) //歌曲名
            let newsong = Object.assign({}, song)
            this.$store.commit('playListOfSongs', newsong) //加入播放列表
        },
        //加入播放列表尾端
        playlater(song) {
            let newsong = Object.assign({}, song)
            this.$store.commit('addListOfSongs', newsong)
        },
        //播放歌单中的所有歌曲
        toplayList(list) {
            this.$store.commit('deleteAll')
            this.toplay(list[0])
            var i = 1;
            while (i < list.length) {
                this.playlater(list[i])
                i++;
            }
        },
        handleDownload(name, music_path) {
            this.$message({
                message: '文件正在下载，请您耐心等待！',
                type: 'warning'
            });
            let path = music_path;
            const xhr = new XMLHttpRequest();
            xhr.open('get', path);
            xhr.responseType = 'blob';
            xhr.send()
            xhr.progress = function() {
                console.log(this);
            }
            xhr.onload = function() {
                if (this.status === 200 || this.status === 304) {
                    const url = URL.createObjectURL(this.response);
                    let a = document.createElement("a");
                    a.href = url;
                    a.download = name;
                    document.body.appendChild(a)
                    a.click();
                    document.body.removeChild(a)
                }
            }
        },

    }
}