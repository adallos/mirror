<template>
  <div>
    <appts-fetch-appts/>
  </div>
</template>

<script>
import ApptsFetchAppts from '../components/ApptsFetchAppts'
export default {
  components:{
    ApptsFetchAppts
  },
  name: 'home',
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