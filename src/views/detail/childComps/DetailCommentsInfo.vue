<template>
  <div class="comment-info-wrap" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-info-title">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div v-for="(item,index) in commentInfo" :key="index">
      <div class="comment-user-info">
        <span>
          <img :src="item.user.avatar" alt class="avatar" />
        </span>
        <span>{{item.user.uname}}</span>
      </div>
      <div class="comment-text">{{item.content}}</div>
      <div class="comment-goods-info">
        <span class="comment-time">{{item.created | showDate}}</span>
        <span>{{item.style}}</span>
      </div>
      <div class="comment-image" v-for="(item,index) in item.images" :key="index">
        <img :src="item" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@common/utils";
export default {
  name: "DetailCommentsInfo",
  props: {
    commentInfo: {
      type: Array,
      default() {},
    },
  },
  filters: {
    showDate(value) {
      //将时间戳转换成date对象
      const date = new Date(value * 1000);
      //将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style >
.comment-info-wrap {
  padding: 0 8px;
  font-size: 14px;
  border-bottom: 4px solid #ececec;
}
.comment-info-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  padding: 10px 4px;
}
.comment-user-info {
  padding: 10px 0;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
  vertical-align: middle;
}
.comment-text {
  line-height: 20px;
}
.comment-goods-info {
  color: #999;
  margin: 4px 0;
}
.comment-goods-info .comment-time {
  margin-right: 10px;
}
.comment-image {
  display: flex;
}
.comment-image img {
  width: 60px;
  height: 60px;
  margin-right: 6px;
}
</style>