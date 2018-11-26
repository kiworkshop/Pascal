 <template>
  <v-snackbar
    v-model="show"
    :bottom="true"
    :right="true"
    :timeout="3000"
  >
    {{ message }}
    <v-btn flat @click="show=false"> 알겠어요! </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data () {
    return {
      show: false,
      message: ''
    }
  },
  created() {
    this.$noticeEventBus.$on('raiseNotice', (message) => {
      this.message = message
      this.show = true
      })
  }
}
</script>