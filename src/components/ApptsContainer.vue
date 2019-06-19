<template>
  <div>
    Today
    <section v-for="appointment in todayAppts" :key="appointment.id">
      <appts-container-card :apptData="appointment"/>
    </section>
    Tomorrow
    <section v-for="appointment in upcomingAppts" :key="appointment.id">
      <appts-container-card :apptData="appointment"/>
    </section>
    <button @click="increaseFetch">fetch more</button>
  </div>
</template>

<script>
import ApptsContainerCard from "../components/ApptsContainerCard";
import dateMixin from "./../mixins/dateManagement.js"
export default {
  mixins:[dateMixin],
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
    },
    todayAppts() {
      return this.todayArr();
    },
    upcomingAppts(){
      console.log(this.upcomingArr());
      
      return this.upcomingArr();
    }
  },
  created() {
    this.$store.dispatch("fetchAppts", this.apptCount);
  },
  methods: {
    increaseFetch() {
      this.$store.dispatch("fetchNextTen"),
        this.$store.dispatch("fetchAppts", this.apptCount);
    },
    todayArr() {
      return this.$store.getters.getAppts.filter(
        appt => this.mixinDayNonOrdinal(appt.appointmentStart) == this.currentDay()
      );
    },
    upcomingArr() {
      return this.$store.getters.getAppts.filter(
        appt => this.mixinDayNonOrdinal(appt.appointmentStart) != this.currentDay()
      );
    }
  }
};
</script>

<style scoped lang="scss">
</style>
