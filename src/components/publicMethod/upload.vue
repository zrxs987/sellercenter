<template>
 <!-- 上传组件 -->
    <div>
         <el-col :span="24">
                        <input type="file" id="xFile"  ref="excel-upload-input" accept="image/png, image/jpeg,image/JPG"   @change="handleClick" >
                        <div style="position:relative;overflow:hidden;" :style="styles">

                             <div class="boredr" id="border"  @click="handleUpload" v-if="!img">
                                  <div class="across"></div>
                                  <div class="vertical"></div>
                            </div>
                             <div class="example" v-if="img"  @click="handleUpload">
                                <img :src="img" alt="" class="exampleimg">
                            </div>
                            <div style=" color: rgba(0, 0, 0, 9);padding-top:20px;"  v-show="!show">  &nbsp;  &nbsp; &nbsp;</div>
                            <div style=" color: rgba(0, 0, 0, 9);padding-top:20px;"  v-show="show">  &nbsp;  &nbsp; &nbsp;{{title}}</div>
                            <div style=" color: rgba(0, 0, 0, 0.65);"> &nbsp;  &nbsp; &nbsp;{{support}}</div>  
                        </div> 
         </el-col>
    </div>
</template>

<script>
import {getUploadFile} from '@/api/openShop'

export default {
    props: {
        show: {
           type: Boolean,
           default: true
        },

        title: {
            type: String,
            default: '个人头像'
        },
            
        styles:{
            type: String,
            default: ''
        }
  },

  data(){
      return{
          img:'',
          support:'',
      }
  },

    methods:{

        handleUpload(){
             this.$refs['excel-upload-input'].click()           
        },

        handleClick(e){

            const files = e.target.files[0]
            const formData = new FormData()
            formData.append("fileName", files) //加入文件对象

            const isLt2M = e.size / 1024 / 1024 < 10
             if (isLt2M) {
              this.$message.error('上传图片大小不能超过 10MB!请重新选择')
              return ;
             }
               this.img = window.URL.createObjectURL(files); 
              //把图片转成字符串
              getUploadFile(formData).then((res) => {

                    if(res.code ==='200'){
                         this.$emit('on-Success',res.data.url)
                          this.$message({
                            message: '上传成功',
                            type: 'success',
                            duration: 2 * 1000
                        })
                    }else{
                        this.$message({
                            message: res.errorMsg,
                            type: '上传失败，请重新上传',
                            duration: 2 * 1000
                        })
                    } 
                //   console.log(res)
            
            })
        },

    },  
}
</script>


<style  scoped>

#xFile{
   z-index:-999;opacity: 0;height:0px;width:0px;  position: absolute;
}

.boredr{
    cursor: pointer!important;
    float: left;
    margin-right: 0.34rem;
    position: relative;
    width: 104px;
    height:104px;
    border: 2px dashed #eee;
    border-radius: 10px;
    background-color:  rgb(249, 249, 249);
}

.boredr .across , .boredr .vertical{
    background-color: #eee;
    position: absolute;
}

 .boredr .across{
    width: 2px;
    height: 40px;
    top: 50%;
    left:50%;
    transform: translate(0%,-50%);  
}

 .boredr .vertical{
    width: 40px;
    height: 2px;
    top: 50%;
    left:50%;
    transform: translate(-50%,0%); 
}

.example{
     width: 104px;
     height: 104px;
     position: absolute;
     left:0;
     top:0;
     display: inline-block;
 }

.exampleimg{
    display: inline-block;
    width: 100%;
    height:100%;
}

</style>
