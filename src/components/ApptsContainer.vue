<template>
  <div>
    <section v-for="(appointment, index) in appointments" :key="index">
      <appts-container-card :apptData="appointment"/>
    </section>
    <button @click="increaseFetch">fetch more</button>
  </div>
</template>

<script>
import ApptsContainerCard from "../components/ApptsContainerCard";
export default {
  name: "Appts",
  components: {
    ApptsContainerCard
  },
  computed: {
    appointments() {
      return this.$store.getters.getAppts;
    },
    apptCount() {
      return this.$store.getters.getFetchStart;
    }
  },
  created() {
    this.$store.dispatch("fetchAppts", this.apptCount);
  },
  methods: {
    increaseFetch() {
      this.$store.dispatch("fetchNextTen"),
        this.$store.dispatch("fetchAppts", this.apptCount);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
