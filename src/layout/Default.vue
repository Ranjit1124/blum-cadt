<template>
  <v-main>
    <v-container fluid class="pa-0">
      <Header />
      <v-container fluid class="pa-0 element d-flex">
        <v-card rounded="0" flat width="300px">
          <Sidebar />
        </v-card>
        <v-card flat rounded="0" width="100%" class="mt-1">
          <Three  />
        </v-card>
      </v-container>
    </v-container>
  </v-main>
</template>
<script>
import Header from "@/components/ui/Header.vue";
import Sidebar from "@/components/ui/Sidebar.vue";
import Three from "@/components/threeContainer/Three.vue";
export default {
  name: "defaultLayout",
  data() {
    return {};
  },
  components: {
    Header,
    Sidebar,
    Three,
  },

};
</script>
<style scoped>
.element {
  height: calc(100vh - 75px);
}
</style>
