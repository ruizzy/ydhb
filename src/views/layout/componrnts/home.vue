<template>
  <div>
    <div style="margin: 10px;overflow: hidden;" v-for="item in list">
      <masker style="border-radius: 2px;" @click.native="choose(item.url)">
        <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
        <div slot="content" class="m-title">
          {{item.title}}
        </div>
      </masker>
    </div>
  </div>
</template>

<script>
import { Masker } from 'vux'

export default {
  components: {
    Masker
  },
  data () {
    return {
      list: [{
        title: '车险核保',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511715498672&di=9ebe96d6a3d53cce84b46f776b55dbcd&imgtype=0&src=http%3A%2F%2Fimg.okbao.com%2Fuploads%2F150226%2F206-15022614363TF.jpg',
        url: 'carUWIndex'
      }, {
        title: '非车险核保',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511715542460&di=f052a3bb87e3977ce546811b1caebbb3&imgtype=0&src=http%3A%2F%2Fimg.okbao.com%2Fuploads%2F141229%2F206-14122911502R52.jpg',
        url: 'nonCarUWIndex'
      }, {
        title: '报表统计',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511715408022&di=9f4d24ec732b07bfc4eef8a6426f973e&imgtype=0&src=http%3A%2F%2Fimage.uczzd.cn%2F14730325282790028282.jpeg%3Fid%3D0%26from%3De%253Cahref%3D',
        url: 'reportFrom'
      }],
      

    }
  },
  methods : {
    choose(url) {
      console.log('url============'+url);
      this.$router.push({
          path: '/carUWIndex'
        })
    }
  }
}
</script>

<style lang="less">
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
</style>
