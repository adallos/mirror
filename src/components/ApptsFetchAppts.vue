<template>
  <section>
    <div v-for="(appt, index) in appts"
      :key=index>
      {{appt.id}} - {{appt.appointmentStart}} -- {{appt.firstName}}<br>
    </div>
    <button @click="increaseFetch"> fetch more </button>
  </section>
</template>

<script>
export default {
  name: 'ApptsFetchAppts',
  computed:{
    appts(){
      return this.$store.getters.getAppts
    },
    apptCount(){
      return this.$store.getters.getFetchStart
    }
  },
  created() {
    this.$store.dispatch('fetchAppts', this.apptCount)
  },
  methods:{
    increaseFetch(){
      this.$store.dispatch('fetchNextTen'),
      this.$store.dispatch('fetchAppts', this.apptCount)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
