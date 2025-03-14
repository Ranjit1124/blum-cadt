<template>
    <div
      ref="threeContainer"
      style="height: 100%;"
      class="three-container mt-1"
    ></div>
</template>
<script>
import { mapState } from 'vuex';
import Three from '../../three/index.js'
export default {
    name:'threeContainer',
data() {
  return {
    threeContainer: null,
    threeScene: null,

  };
},
computed:{
  ...mapState(['dimensions','thickness'])
},
watch:{
  dimensions(updatedDimension){
    this.threeScene.updatedDimensions(updatedDimension)
  },
  thickness(updatedthickness){
    this.threeScene.createCabinet(updatedthickness)

  }
},
mounted() {
  this.threeContainer = this.$refs.threeContainer;
  this.threeScene = new Three(this.threeContainer);
  

},

};
</script>
