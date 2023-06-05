export const mixin = {

    methods: {
        //立刻播放音乐
        toplay(song) {
            this.$store.commit('setIsPlay', true);
            this.$store.commit('setId', song.id); //歌曲id
            this.$store.commit('setPicUrl', song.cover_path); //歌曲封面
            this.$store.commit('setUrl', song.music_path); //歌曲url
            this.$store.commit('setTitle', song.music_name) //歌曲名
            this.$store.commit('playListOfSongs', song) //加入播放列表
        },
        //设置解析歌词
        playlyric(lyricsUrl) {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('GET', lyricsUrl);
            xhr.send();
            xhr.onload = () => {
                const lyricsText = xhr.response;
                this.parseLyric(lyricsText)
            };

        },
        //加入播放列表尾端
        playlater(song) {
            this.$store.commit('addListOfSongs', song)
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
        //解析歌词
        parseLyric(lyrics) {
            let lines = lyrics.split('\n')
            let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g
            let result = []
            if (!(/\[.+\]/.test(lyrics))) {
                return [
                    [0, lyrics]
                ]
            }
            while (!pattern.test(lines[0])) {
                lines = lines.slice(1)
            }
            lines[lines.length - 1].length === 0 && lines.pop()
            for (let item of lines) {
                let time = item.match(pattern)
                let value = item.replace(pattern, '')
                console.log(time)
                console.log(value)
                for (let item1 of time) {
                    let t = item1.slice(1, -1).split(':')
                    if (value !== '') {
                        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
                    }
                }
            }
            result.sort(function(a, b) {
                return a[0] - b[0]
            })
            this.$store.commit('setLyrics', result)
        },

    }
}