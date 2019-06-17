<template>
  <div class="buttonsContainer">
    <span :class="'dot'+textRendering()"></span>
    <span :class="'text'+textRendering()">{{firstUppercased()}}</span>
  </div>
</template>

<script>
export default {
  props: ["textStatus"],
  methods: {
    textRendering() {
      switch (this.textStatus) {
        case "confirmed":
          return "__blue-text";
          break;
        case "pending":
          return "__yellow-text";
          break;
        case "cancelled":
          return "__red-text";
          break;
        default:
          break;
      }
    },
    firstUppercased() {
      return this.textStatus.charAt(0).toUpperCase() + this.textStatus.slice(1);
    }
  }
};
</script>

<style scoped lang="scss">
.dot {
  &__red-text {
    margin: 0px 5px;
    background-color: $app-red;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  &__yellow-text {
    margin: 0px 5px;
    background-color: $app-yellow;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  &__blue-text {
    margin: 0px 5px;
    background-color: $app-blue;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
  }
}

.text {
  &__red-text {
    color: $app-red;
  }
  &__yellow-text {
    color: $app-yellow;
  }
  &__blue-text {
    color: $app-blue;
  }
}
</style>
