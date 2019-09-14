<template>
  <v-row
    wrap
    :style="{
      backgroundColor: color
    }"
    class="cat_card"
    justify="center"
    align-content="center"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      :alt="img"
      :src="img"
      class="cat_card_img"
    >
    <h1 v-if="hovered">
      VOTE FOR ME
    </h1>
  </v-row>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#e5e5e5'
    }
  },
  data () {
    return {
      hovered: false
    }
  }
}
</script>

<style scoped>
h1 {
  color: var(--v-secondary-base);
  display: block;
  position: absolute;
  text-align: center;
  top: 10%;
  width: 100%;
}
.cat_card {
  position: relative;
  width: 100%;
  height: 100%;
}
.cat_card_img {
  width: 80%;
  height: 50%;
  object-fit: cover;
  border-radius: 25px;
}
</style>
