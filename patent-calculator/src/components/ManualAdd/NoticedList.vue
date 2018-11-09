<template>
  <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>고시명칭 상품 목록</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <p class="caption text-xs-left" ><br><br></p> -->
    </v-toolbar>
    <v-data-table
    :headers="headers"
    :items="products"
    :rows-per-page-items="rowsPerPageItems"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item['NICE분류'] }}</td>
      <td class="text-xs-center"><input type="text" v-model="props.item['지정상품(국문)']"></td>
      <td class="text-xs-center">
        <!--수정하기-->
        <v-btn flat icon slot="activator" color="primary" dark @click.native="moveProductToUnnoticed(props.item.id)">
          <v-icon small>compare_arrows</v-icon>
        </v-btn>
        <v-btn flat icon slot="activator" color="red" dark @click.native="deleteFromList(props.item.id)">
          <v-icon small>delete</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      rowsPerPageItems: [
        10,
        25,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        {
          text: "분류",
          align: "center",
          value: "NICE분류"
        },
        {
          text: "명칭",
          align: "center",
          sortable: false,
          value: "지정상품(국문)"
        },
        {
          text: "수정하기",
          align: "center",
          sortable: false,
          value: "수정하기"
        }
      ]
    }
  },
  methods: {
    moveProductToUnnoticed(id) {
      let index = this.products.findIndex(product => product['id'] == id);
      let movedProduct = this.products.splice(index, 1)[0];
      movedProduct['고시명칭'] = false;
      this.$productTransmissionBus.$emit('transmit unnoticed', movedProduct);
    },
    submitProductsToBriefcase() {
      for (let i = 0; i < this.products.length; i++) {
        let currentProduct = Object.assign({}, this.products[i]);
        currentProduct['고시명칭'] = true;
        this.$store.dispatch("addProduct", currentProduct);
      }
      this.products = [];
    },
    deleteFromList(id) {
      let index = this.products.findIndex(product => product['id'] == id);
      this.products.splice(index, 1);
    }
  },
  mounted() {
    this.$submissionAlarmBus.$on('submitProducts', this.submitProductsToBriefcase);
    this.$productTransmissionBus.$on('transmit noticed', (movedProduct) => {
      this.products.push(movedProduct);
    });
  }
}
</script>
