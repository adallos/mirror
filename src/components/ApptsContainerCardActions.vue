<template>
  <div class="buttonsContainer">
    <div v-for="button in buttonsRendering()" :key="button">
      <base-button :buttonType="button"/>
    </div>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton";
export default {
  components: {
    BaseButton
  },
  props: ["apptState"],
  methods: {
    buttonsRendering() {
      switch (this.apptState) {
        case "confirmed":
          return ["icon-edit", "icon-cancel"];
          this.buttonsAmount = 2;
          break;
        case "pending":
          return ["icon-confirm", "icon-cancel"];
          this.buttonsAmount = 2;
          break;
        case "cancelled":
          return [""];
          this.buttonsAmount = 0;
          break;
        default:
          return [""];
          this.buttonsAmount = 0;
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.buttonsContainer {
  display: flex;
}
</style>
