<template>
  <div class="ArticleCard">
    <div class="ArticleCard__Header">
      <img
        src="https://cdn-ak.f.st-hatena.com/images/fotolife/a/andoshin11/20180922/20180922222723.png"
        alt=""
        class="ArticleCard__Img">
    </div>
    <div class="ArticleCard__Body">
      <div class="ArticleCard__Info">
        <div class="ArticleCard__Title">Nuxt.js v2.0.0がリリースされたので触ってみた【変更点まとめ】</div>
        <div class="ArticleCard__Date">Sep 23rd, 2018</div>
      </div>
      <div class="ArticleCard__Summary">
        去る2018年9月21日にVue.jsのユニバーサルフレームワークであるNuxt.jsのメジャーアップデート版、v2.0.0がリリースされました。
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.ArticleCard {
  display: flex;
  flex-direction: column;
  border: solid 1px #ddd;
  width: 360px;
}

.ArticleCard__Header {
  height: 220px;
}

.ArticleCard__Img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  height: 100%;
}
</style>
