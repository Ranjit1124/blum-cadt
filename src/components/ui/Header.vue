<template>

  <v-container style="height: 70px;" class="drop-shadow" fluid>
    <v-row no-gutters class="d-flex align-center">
      <v-col cols="6">
        <v-img src="images/logo.png" width="150px" height="44px" />
      </v-col>
      <v-col cols="6" class="text-end">
        <v-btn height="50px" width="240px" color="#002C48" class="white--text text-capitalize">
          Get Fitting Suggestions
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>
<script>
export default {
  name: "headerComponent",
};
</script>

<style scoped>
.drop-shadow{
    box-shadow: 0px  5px 10px 0px rgba(0, 0, 0,0.1);
}
</style>
