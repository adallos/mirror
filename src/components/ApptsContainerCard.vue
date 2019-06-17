<template>
  <div>
    <card-info :apptData="apptData" :class="cardState()"/>
    <span></span>
  </div>
</template>

<script>
import ApptsContainerCardInfoVue from "./ApptsContainerCardInfo.vue";
export default {
  props: {
    apptData: {}
  },
  components: {
    CardInfo: ApptsContainerCardInfoVue
  },
  methods: {
    cardState() {
      return this.apptData.status + "ApptBorder";
    }
  }
};
</script>

<style scoped lang="scss">
.cancelledApptBorder {
  border-left: 12px solid $app-red;
}
.confirmedApptBorder {
  border-left: 12px solid $app-blue;
}
.pendingApptBorder {
  border-left: 12px solid $app-yellow;
}
</style>
