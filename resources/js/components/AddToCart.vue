<template>
  <v-layout row justify-center>
    <v-dialog v-model="isshown" persistent scrollable max-width="800px">
      <v-card>
        <v-card-title>Add Sales</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px;">

<v-simple-table 
    fixed-header
    height="300px">
<template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            Product
          </th>
          <th class="text-center">
            Stocks Available
          </th>
          <th class="text-center">
            Unit Price
          </th>          
          <th class="text-center">
            Sale Quantity
          </th>
           <th class="text-center">
            Total Price
          </th>         
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in itemsInCart"
          :key="item.name"
        >
          <td class="text-center">{{ item.products }}</td>
          <td class="text-center">{{ item.stocks }}</td>
           <td class="text-center">{{ item.price }}</td>
          <td class="text-center" width="180px">
                    <v-select
                    v-model="quantity.item[index]"
                    dense
                    hide-details
          :items="convertNumberToArray(item.stocks)"
          label="Select quantity"
          solo
          @change="addToSales(item, quantity.item[index])"
        ></v-select>
          </td>
          <td class="text-center"> {{ isNaN(item.price * quantity.item[index]) ? 0: item.price * quantity.item[index] }}</td>
        </tr>
      </tbody>
    </template>


      </v-simple-table>





        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" text @click="saveSales()">Ok</v-btn>
          <v-btn color="error" text @click="$CrudFunc.hideDialogs()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import { bus } from '../app.js';
import { mapState } from 'vuex';
  export default {
    name: 'AddToCart',
    props:{
      isshown : Boolean,
    },
  data: () => ({
    itemsInCart: [],
    quantity: {
      item: []
    },
    salesArr: [],
    productsArr: [],

  }),

  computed:{
    ...mapState(['ProductList'])
  },

  mounted(){
    bus.$on('addtoCart', (data) => {
      this.itemsInCart = []
      this.quantity = {item: []}
      this.ProductList.forEach(item =>{
        data.forEach(key =>{
          if(key == item.id){
            this.itemsInCart.push(item)
          }
        })
      })
    })




 

    

  },
  methods: {
    convertNumberToArray(Count){
      let tmpArr = []
      for (var i = 1; i <= Count; i++) {
        tmpArr.push(i)

       }

       return tmpArr
     },

     addToSales(items, quantity){
       let tmpObj = {}
       let tmpproducts = {}

       tmpObj.id = items.id
       tmpObj.products = items.products
       tmpObj.quantity = quantity
       tmpObj.stocks = items.stocks
       tmpObj.totalsales = quantity * items.price
       
       this.productsArr.push(tmpproducts)
       this.salesArr.push(tmpObj)
     },

     saveSales(){
      this.salesArr.forEach(item => {
        item.stocks = item.stocks - item.quantity
        this.$CrudFunc.UpdateProduct( item );
        this.$CrudFunc.AddSales( item );
      })  
     }



  }
}
</script>