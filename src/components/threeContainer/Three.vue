<template>
    <div
      ref="threeContainer"
      style="height:100vh"
      class="three-container"
    ></div>
</template>
<script>
import Three from '../../three/index.js'
export default {
    name:'threeContainer',
data() {
  return {
    threeContainer: null,
    threeScene: null,

  };
},

mounted() {
  this.threeContainer = this.$refs.threeContainer;
  this.threeScene = new Three(this.threeContainer);
  
  this.threeScene.object();

},

};
</script>