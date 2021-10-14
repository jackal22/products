<template>
<v-dialog
      v-model="isshown"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ dialogType.title }}
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
          <v-btn color="success" text @click="addOrUpdateItem()">
            {{ dialogType.button }}
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
    dialogType: {},

    isSales: 0,
  }),

   computed:{
    ...mapState(['ProductList'])
  },

  async mounted(){
    bus.$on('UpdateTitle', (data) =>{
      this.dialogType = data
    })

    bus.$on('editItems', (data) => {

      const selectedProduct = this.ProductList.filter( item => { return item.id == data })

      this.products.id       = selectedProduct[0].id
      this.products.products = selectedProduct[0].products
      this.products.stocks   = selectedProduct[0].stocks
      this.products.price    = selectedProduct[0].price 
    })





    bus.$on('resetTextField', () => {
      this.products = {}
    })








  },
  methods: {
    addOrUpdateItem () {
      console.log(this.dialogType.kind)
      if(this.products.products && this.products.stocks && this.products.price){
        switch(this.dialogType.kind){
          case 0: 
            this.$CrudFunc.UpdateProduct( this.products );
            break;
          case 1:
            this.$CrudFunc.AddProduct( this.products );
            break;
        }
      }else{
        alert('All Items Required')
      }
    }
  }
}
</script>