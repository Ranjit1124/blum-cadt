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
          <v-text-field
            rounded
            class="auto-complete"
            @input="dimension()"
            dense
            v-model="width"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Depth (mm)</label>
          <v-text-field
            class="auto-complete"
            @input="dimension()"
            v-model="depth"
            dense
            rounded
            type="number"
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Height (mm)</label>
          <v-text-field
            class="auto-complete"
            rounded
            type="number"
            @input="dimension()"
            v-model="height"
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Top Panel Thickness (mm)</label>
          <v-text-field
            class="auto-complete"
            rounded
            type="number"
            @input="dimension()"
            v-model="topPanelThickness"
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Bottom Panel Thickness (mm)</label>
          <v-text-field
            class="auto-complete"
            rounded
            type="number"
            @input="dimension()"
            v-model="bottomPanelThickness"
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Right Panel Thickness (mm)</label>
          <v-text-field
            class="auto-complete"
            rounded
            type="number"
            @input="dimension()"
            v-model="rightPanelThickness"
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Left Panel Thickness (mm)</label>
          <v-text-field
            class="auto-complete"
            rounded
            type="number"
            @input="dimension()"
            v-model="leftPanelThickness"
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Back Panel Thickness (mm)</label>
          <v-text-field
            class="auto-complete"
            rounded
            type="number"
            @input="dimension()"
            v-model="backPanelThickness"
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <label>Front Panel Thickness (mm)</label>
          <v-text-field
            class="auto-complete"
            rounded
            type="number"
            @input="dimension()"
            v-model="frontPanelThickness"
            dense
          ></v-text-field>
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
      width: "600",
      depth: "600",
      height: "600",
      topPanelThickness: "10",
      bottomPanelThickness: "10",
      rightPanelThickness: "10",
      leftPanelThickness: "10",
      frontPanelThickness: "10",
      backPanelThickness: "10",

    };
  },
  methods: {
    dimension() {
      const cupboardDimension = {
        width: this.width / 100,
        height: this.height / 100,
        depth: this.depth / 100,
      };
        const thicknessValues = {
            topPanelThickness: this.topPanelThickness / 100,
        bottomPanelThickness: this.bottomPanelThickness / 100,
        rightPanelThickness: this.rightPanelThickness / 100,
        leftPanelThickness: this.leftPanelThickness / 100,
        frontPanelThickness: this.frontPanelThickness / 100,
        backPanelThickness: this.backPanelThickness / 100,

        } 
        
      this.$store.commit("dimensionsData", cupboardDimension);
      this.$store.commit("thicknessData", thicknessValues);

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
