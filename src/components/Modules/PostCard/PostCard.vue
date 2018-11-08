<template>
  <div class="PostCard">
    <div class="header">
      <img
        src="https://cdn-ak.f.st-hatena.com/images/fotolife/a/andoshin11/20180922/20180922222723.png"
        alt=""
        class="img">
    </div>
    <div class="body">
      <div class="date">9.23.18</div>
      <div class="title">Nuxt.js v2.0.0がリリースされたので触ってみた【変更点まとめ】</div>
      <div class="summary">
        去る2018年9月21日にVue.jsのユニバーサルフレームワークであるNuxt.jsのメジャーアップデート版、v2.0.0がリリースされました。
      </div>
      <div class="tagList">
        <div class="tag">JavaScript</div>
        <div class="tag">Nuxt</div>
        <div class="tag">ES6</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {}

export default Vue.extend({
  data(): IData {
    return {}
  }
})
</script>

<style>
.PostCard {
  display: flex;
  flex-direction: column;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
  overflow: hidden;
  transition: 0.3s ease-out;
}

.PostCard:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
}

.header {
  width: 100%;
  max-height: 300px;
  overflow: hidden;
}

.body {
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
}

.img {
  width: 100%;
  transition: 0.4s ease-out;
}

.PostCard:hover img {
  transform: scale(1.2);
}

.date {
  text-align: left;
  color: #777;
  font-size: 12px;
  margin-bottom: 8px;
  font-family: 'M PLUS 1p', sans-serif, Hiragino Kaku Gothic Pro, Meiryo,
    MS PGothic, sans-serif, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
    Arial, 'メイリオ', Meiryo;
}

.title {
  font-weight: bold;
  text-align: left;
  font-size: 18px;
  margin-bottom: 16px;
}

.summary {
  text-align: left;
  color: #777;
  font-size: 14px;
  margin-bottom: 32px;
}

.tagList {
  text-align: left;
  margin-bottom: 16px;
}

.tag {
  border: solid 1px #5b3cc4;
  display: inline;
  margin-right: 4px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.15s;
}

.tag:hover {
  background: #5b3cc4;
  color: #fff;
}
</style>
