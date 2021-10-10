<template>
<v-dialog
      v-model="isshown"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ DialogTitle }}
        </v-card-title>
        <br>
        <v-card-text>
          <v-text-field
            label="ProductName"
            placeholder="Placeholder"
            v-model="products.products"
            outlined
          ></v-text-field>


            <v-text-field
            label="Stock"
            value=""
            placeholder="Stocks"
            v-model="products.stocks"
                        type="number"
            outlined
          ></v-text-field>

            <v-text-field
            label="Price"
            value=""
            placeholder="Price"
            v-model="products.price"
                        type="number"
            outlined
          ></v-text-field>


        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="addItem()">
            {{ DialogButton }}
          </v-btn>
          <v-btn
            color="error"
            text
            @click="$CrudFunc.hideDialogs()"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>

<script>
import { bus } from '../app.js';
import { mapState } from 'vuex';
  export default {
    name: 'DialogInfo',
    props:{
      isshown : Boolean,
      itemID : String,
    },
  data: () => ({
    sales: {
      quantity: '',
      totalsale: '',
    },
    products: {
      id: '',
      products    : '',
      stocks : '',
      price: '',
    },
    productsInfo: [],
    DialogTitle: 'Add Item',
    DialogButton: 'Add',
    isSales: 0,
  }),

   computed:{
    ...mapState(['ProductList'])
  },

  async mounted(){
    this.products = {}


    bus.$on('UpdateTitle', (data) =>{
      this.DialogTitle = data.title
      this.DialogButton = data.button

    })






    // bus.$on('editItems', (data) => {
    //   this.DialogTitle = 'Update Item'
    //    this.ProductsInfos.forEach(item => {
    //       if(item.id == data){



    //         this.products.currentStock = item.stocks
    //         this.products.currentPrice = item.price
    //         this.products.id = item.id
    //         this.products.products = item.products
    //         this.products.stocks = item.stocks
    //         this.products.price = item.price




    //       }
    //     })
    // })

  },
  methods: {
    addItem () {
      if(this.products.products && this.products.stocks && this.products.price){
        this.$CrudFunc.AddProduct( this.products );
        this.products = {}
      }else{
        alert('All Items Required')
      }
    }
  }
}
</script>