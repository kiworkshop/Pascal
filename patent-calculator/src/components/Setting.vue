 <template>
  <v-dialog v-model="dialog" width="900">
    <v-btn 
    flat 
    slot="activator"
    @click.native="initSetting()">
      <v-badge color="blue-grey lighten-3">
        <v-icon>setting</v-icon>
        설정
      </v-badge>
    </v-btn>
    <v-card>
        <v-card-title>
        <span class="headline">설정</span>
        </v-card-title>
        <v-card-text>
        <v-container grid-list-md>

        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="commitSetting()">확인</v-btn>
        <v-btn color="primary" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>                
</template>

<script>
export default {
  name: "Manual Add",
  data () {
    return {
      dialog: false,
      setting: {},
    }
  },
  methods:{
    initInput() {
    },
    commitSetting() {
    }
  },
  created() {
    this.$noticeEventBus.$on('raiseNotice', (message) => {
      this.message = message
      this.show = true
      })
  },
  computed: {
    classes() {
      return this.$store.getters.classes;
    },
    selected() {
      let classes = this.$store.getters.selected;
      let goods = [];
      for (const classId in classes) {
        goods = goods.concat(Object.values(classes[classId]))
      }
      return goods;
    }
  }
}
</script>