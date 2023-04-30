<template>
    <div class="background-div">
      <div class="creator-main-div">
        <div style="text-align: center;margin: auto;">
            <h2>创作者中心</h2>
        </div>
        <div class="update-form">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="歌曲名称">
                    <el-input maxlength="20" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="歌曲类型">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="轻音乐" name="type"></el-checkbox>
                    <el-checkbox label="摇滚" name="type"></el-checkbox>
                    <el-checkbox label="说唱" name="type"></el-checkbox>
                    <el-checkbox label="其他待定" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="歌曲来源">
                  <el-radio-group v-model="Source" >
                    <el-radio :label="1" @click.native="changeSinger">原创歌曲</el-radio>
                    <el-radio :label="2">转载歌曲</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="歌手" v-show="Source == 2">
                  <el-input v-model="form.singer" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="歌曲封面">
                  <el-upload  list-type="picture-card" :auto-upload="false" :class="{disabled:uploadDisabled}"
                   accept="image/jpeg,image/jpg" :limit="1" action="#" :on-change="handleLimit" :on-remove="handleRemove">
                    <img v-if="form.imageUrl" :src="form.imageUrl">
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="歌曲简介">
                    <el-input autosize maxlength="255" type="textarea" v-model="form.intro"></el-input>
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
  export default {
    data() {
      return {
        form: {
          name: '',
          type: [],
          singer: '',
          intro: '',
          imageUrl: '',    //歌曲封面
        },
        Source: '0',      //歌曲来源
        uploadDisabled: false,   //控制upload组件
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form.singer);
        //还没提交
      },
      handleLimit(file, fileList) {
          if (fileList.length >= 1) {
              this.uploadDisabled = true;
              this.$set(this, 'uploadDisabled', true);
              this.$forceUpdate();
          }
      },
      handleRemove(){
        this.uploadDisabled = false;
        this.$set(this, 'uploadDisabled', false);
        this.$forceUpdate();
      },
      changeSinger(){
        this.form.singer="当前用户"     //改变成为当前用户的用户名
      }
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