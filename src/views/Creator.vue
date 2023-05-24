<template>
    <div class="background-div">
      <div class="creator-main-div">
        <div style="text-align: center;margin: auto;">
            <h2>创作者中心</h2>
        </div>
        <div class="update-form">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="歌曲名称">
                    <el-input maxlength="20" v-model.trim="form.name"></el-input>
                </el-form-item>
                <el-form-item label="歌手">
                  <el-input v-model.trim="form.singer_name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="歌曲标签">
                  <el-checkbox-group v-model="form.labels">
                    <el-checkbox label="流行" name="type"></el-checkbox>
                    <el-checkbox label="摇滚" name="type"></el-checkbox>
                    <el-checkbox label="民谣" name="type"></el-checkbox>
                    <el-checkbox label="电子" name="type"></el-checkbox>
                    <el-checkbox label="说唱" name="type"></el-checkbox>
                    <el-checkbox label="轻音乐" name="type"></el-checkbox>
                    <el-checkbox label="古风" name="type"></el-checkbox>
                    <el-checkbox label="爵士" name="type"></el-checkbox>
                    <el-checkbox label="金属" name="type"></el-checkbox>
                    <el-checkbox label="拉丁" name="type"></el-checkbox>
                    <el-checkbox label="其他" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="歌曲封面">
                  <el-upload  list-type="picture-card" :auto-upload="false" :class="{disabled:uploadDisabled}"
                   accept="image/jpeg,image/jpg" :limit="1" action="" :on-change="handleLimit"  :on-remove="handleRemove">
                    <img v-if="form.cover" :src="form.cover">
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="音源文件">
                  <input type="file" @change="onAudioChange" accept="audio/mp3">
                </el-form-item>
                <el-form-item label="歌词文件">
                  <input type="file" @change="onLyricsChange">
                </el-form-item>
                <el-form-item label="歌曲简介">
                    <el-input autosize maxlength="255" type="textarea" v-model.trim="form.introduction"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="onSubmit">上传歌曲</el-button>
                </el-form-item>
            </el-form>
        </div>
      </div>
    </div>
</template>
  
<script>
import {uploadSong} from "@/api/api"
  export default {
    data() {
      return {
        form: {
          name:'',
          singer_name:'',
          introduction:'',
          audio:null,
          cover:null,
          lyrics: null,
          labels: [],
        },
        uploadDisabled: false,   //控制upload组件
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form)
        if(localStorage.getItem('loginInfo')!=null){
          if(this.form.name==''||this.form.singer_name==''||this.form.introduction==''||this.form.cover==null||this.form.audio==null||this.form.labels.length==0){
            alert("内容不能为空");
          }else{
            var formData = new FormData();
            formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
            formData.append('music_labels',this.form.labels)
            formData.append('music_name',this.form.name)
            formData.append('music_cover',this.form.cover)
            formData.append('singer_name',this.form.singer_name)
            formData.append('lyrics',this.form.lyrics)
            formData.append('description',this.form.introduction)
            formData.append('music',this.form.audio)
            uploadSong(formData)
              .then(res => {
                alert("上传成功")
              })
              .catch(err => {
                alert("上传失败")
              })
              this.$router.push("/homepage");
          }
        }else{
          alert("请先登录")
        }
      },
      handleLimit(file, fileList) {
          if (fileList.length >= 1) {
              this.uploadDisabled = true;
              this.$set(this, 'uploadDisabled', true);
              this.onCoverChange(file.raw);
              this.$forceUpdate();
          }
      },
      handleRemove(){
        this.uploadDisabled = false;
        this.$set(this, 'uploadDisabled', false);
        this.form.cover='';
        this.$forceUpdate();
      },
      onAudioChange(event) {
        this.form.audio = event.target.files[0];
      },
      onLyricsChange(event){
        this.form.lyrics = event.target.files[0];
      },
      onCoverChange(file) {
        this.form.cover=file;
      },
    }
  }
</script>
  
<style>
.background-div {
  width: 100%;
  height: 100%;
  background-color: rgb(248, 248, 248);
  padding-bottom: 100px;
}
.creator-main-div{
  display: block;
  width: 80%;
  min-height: 200px;
  background-color: white;
  overflow: hidden;
  margin:auto;
  border:2px solid rgb(239, 239, 239);

}
.update-form{
  width: 50%;
  height: auto;
  background-color: white;
  margin:auto;
}
.disabled .el-upload.el-upload--picture-card {
    display: none !important;
}

</style>