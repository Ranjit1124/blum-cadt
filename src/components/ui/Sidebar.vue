<template>
  <v-container fluid class="border element py-0 px-0">
    <v-row
      class="browser-text d-flex align-center justify-center pl-4"
      no-gutters
    >
      <v-col> BROWSER </v-col>
    </v-row>
    <v-container fluid>
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="cabinent-text letter-spacing"> Cabinet Dimensions </v-col>
        <v-col class="">
          <label>Width (mm)</label>
          <v-autocomplete
            rounded
            class="auto-complete"
            @change="dimension()"
            dense
            v-model="width"
            :items="items"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Depth (mm)</label>
          <v-autocomplete
            :items="items"
            class="auto-complete"
            @change="dimension()"
            v-model="depth"
            dense
            rounded
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Height (mm)</label>
          <v-autocomplete
            class="auto-complete"
            rounded
            :items="items"
            @change="dimension()"
            v-model="height"
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Top Panel Thickness (mm)</label>
          <v-autocomplete
            class="auto-complete"
            rounded
            :items="items"
            @change="dimension()"
            v-model="topPanelThickness"
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Bottom Panel Thickness (mm)</label>
          <v-autocomplete
            :items="items"
            class="auto-complete"
            rounded
            @change="dimension()"
            v-model="bottomPanelThickness"
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Right Panel Thickness (mm)</label>
          <v-autocomplete
            :items="items"
            class="auto-complete"
            rounded
            @change="dimension()"
            v-model="rightPanelThickness"
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Left Panel Thickness (mm)</label>
          <v-autocomplete
            :items="items"
            class="auto-complete"
            rounded
            @change="dimension()"
            v-model="leftPanelThickness"
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Back Panel Thickness (mm)</label>
          <v-autocomplete
            :items="items"
            class="auto-complete"
            rounded
            @change="dimension()"
            v-model="backPanelThickness"
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <label>Front Panel Thickness (mm)</label>
          <v-autocomplete
            :items="items"
            class="auto-complete"
            rounded
            @change="dimension()"
            v-model="frontPanelThickness"
            dense
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  name: "sidebarComponent",
  data() {
    return {
      width: "800",
      depth: "800",
      height: "800",
      topPanelThickness: "800",
      bottomPanelThickness: "800",
      rightPanelThickness: "800",
      leftPanelThickness: "800",
      frontPanelThickness: "800",
      backPanelThickness: "800",

      items: ["400", "600", "800"],
    };
  },
  methods: {
    dimension() {
      const cupboardDimension = {
        width: this.width / 100,
        height: this.height / 100,
        depth: this.depth / 100,
        topPanelThickness: this.topPanelThickness / 100,
        bottomPanelThickness: this.bottomPanelThickness / 100,
        rightPanelThickness: this.bottomPanelThickness / 100,
        leftPanelThickness: this.leftPanelThickness / 100,
        frontPanelThickness: this.frontPanelThickness / 100,
        backPanelThickness: this.backPanelThickness / 100,
      };

      this.$store.commit("dimensionsData", cupboardDimension);
    },
  },
};
</script>
<style scoped>
.border {
  border-right: 1px solid #d2d2d2;
}
.browser-text {
  background: #fafafa;
  border-bottom: 1px solid #d2d2d2;
  height: 30px;
  font-weight: 500;
  font-size: 13px;
}

.letter-spacing {
  line-height: 100%;
  letter-spacing: 2.5%;
}
.cabinent-text {
  font-weight: 600;
  height: 13px;
  font-size: 11px;
}

label {
  color: #4f4f4f;
  font-weight: 500;
  font-size: 9px;
  line-height: 100%;
  letter-spacing: 2.5%;
}

.auto-complete {
  border: 0.5px solid #d2d2d2;
  border-radius: 3px;
}

::v-deep(.v-input__control) {
  max-height: 25px !important;
}

::v-deep(.v-input__control > .v-input__slot) {
  padding: 0px 3px !important;
}

::v-deep(
    .v-text-field--outlined.v-input--dense.v-text-field--outlined
      > .v-input__control
      > .v-input__slot,

  ) {
  min-height: 25px !important;
  display: flex;
  align-items: center;
}

::v-deep(
    .v-text-field--enclosed.v-input--dense:not(
        .v-text-field--solo
      ).v-text-field--outlined
      .v-input__append-inner
  ) {
  margin-top: 4px;
}
.element {
  height: calc(100vh - 75px);
}
</style>
