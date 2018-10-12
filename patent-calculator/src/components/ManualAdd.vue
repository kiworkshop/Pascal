 <template>
  <v-dialog v-model="dialog" width="900">
    <v-btn 
    flat 
    slot="activator"
    @click.native="initInput()">
      <v-badge color="blue-grey lighten-3">
        <v-icon>add</v-icon>
        추가
      </v-badge>
    </v-btn>
    <v-card>
        <v-card-title>
        <span class="headline">지정상품 추가하기</span>
        </v-card-title>
        <v-card-text>
        <v-container grid-list-md>
            <v-layout column wrap>
            <v-flex>
                <v-select
                  v-model="className"
                  :items="classes"
                  label="분류"
                ></v-select>
            </v-flex>
            <v-flex>
                <v-text-field
                  v-model="text"
                  label="명칭"
                  required
                ></v-text-field>
            </v-flex>
            </v-layout>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="add()">추가</v-btn>
        <v-btn color="primary" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>                
</template>

<script>
export default {
  name: "ManualAdd",
  data () {
    return {
      dialog: false,
      className: '',
      text: '',
      addingProduct: {
        'id':0,
        'NICE분류':'',
        '지정상품(국문)':'',
        '지정상품(영문)':'',
        '유사군코드':'',
        '고시명칭':false
      },
      manuallyAddedProducts: 0
    }
  },
  methods:{
    initInput() {
      this.className = '',
      this.text = ''
    },
    splitText() {
      // 앞에 붙어 나오는 space 처리 -> 검색 방식에 따라 처리가 불필요할 수도
      return this.text.split(',');
    },
    add() {
      /* let stringList = this.splitText();
        // 검색
        // 명칭이 있을 경우 -> 고시명칭
        // 명칭이 없을 경우 -> 비고시명칭
        // 비고시명칭에 대한 처리 -> 분류 선택

      */
    
      this.manuallyAddedProducts += 1;
      this.addingProduct['id'] = -this.manuallyAddedProducts;
      this.addingProduct['NICE분류'] = this.classes.indexOf(this.className);
      this.addingProduct['지정상품(국문)'] = this.text;
      this.$store.dispatch("addProduct", this.addingProduct);
      this.dialog = false;
      const message = "[ " + this.addingProduct["NICE분류"] + "류 ] " + this.addingProduct["지정상품(국문)"] + "이(가) 지정상품에 추가되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
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