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
            outlined
          ></v-text-field>

            <v-text-field
            label="Price"
            value=""
            placeholder="Price"
            v-model="products.price"
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
      isshownaddtocart : Boolean,
      itemID : String,
    },
  data: () => ({
    products: {
      id: '',
      products    : '',
      stocks : '',
      price: '',
    },
    itemsInCart: [],
  }),

   computed:{
    ...mapState(['ProductsInfos'])
  },

  async mounted(){
 

     bus.$on( 'itemsToDelete', (data) => {
       this.ProductsInfos.forEach(item =>{
          if(data == item.id){
            this.itemsInCart.push(item)
          }


       })

     })


    

  },
  methods: {
    addItem () {
     


      bus.$emit('resetSelection')
      this.products = {}
    }
  }
  }
</script>