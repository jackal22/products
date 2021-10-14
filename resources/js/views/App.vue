<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h4>Stock Management</h4>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items >
      <v-btn text @click="addItems()">
        <span class="mr-2">Add</span>
      </v-btn>

      <v-divider></v-divider>

      <v-btn :disabled="disableButtonEdit" text @click="editItems()">
          <span class="mr-2">Edit</span>
      </v-btn>

        <v-divider></v-divider>

        <v-btn text :disabled="disableButtonDelete" @click="deleteItems()">
          <span class="mr-2">Delete</span>
        </v-btn>

          <v-btn text :disabled="disableButtonAddToCart" @click="addToCart()">
          <span class="mr-2">Add To Cart</span>
        </v-btn>

      </v-toolbar-items>
    </v-app-bar>


    <table-component class="pt-12" />


     <form-input :isshown="showInfoDialog" :itemID="itemID" />
     <add-cart :isshown="showCart" />
     <total-sales :isshown="showSales" />
   

    <v-main>
      <router-view/>
    </v-main>


  </v-app>
</template>
<script>
import TableComponent from '../components/Table.vue';
import FormInput from '../components/FormInput.vue';
import AddCart from '../components/AddToCart.vue';
import TotalSales from '../components/TotalSales.vue';
import { bus } from '../app.js';
  export default {
    components:{
    TableComponent,
    FormInput,
    TotalSales,
    AddCart,
    },

    data: () => ({
      productList: [],
      showSales: false,
      showInfoDialog: false,
      showCart: false,
      selectedItems: [],
      itemID: '',
      disableButtonEdit  : true,
      disableButtonDelete: true,
      disableButtonAddToCart: true,

    }),


    async mounted(){

    bus.$on( 'showSalesDialog', (data) =>{
      this.showSales = data
    }) 

    bus.$on( 'hideDialogs', (data) =>{
      this.showInfoDialog = data
    })

    bus.$on( 'hideCart', (data) =>{
      this.showCart = data
    })

    bus.$on( 'disableEdit', (data) =>{
      this.disableButtonEdit = data
    })


    bus.$on( 'disableDelete', (data) =>{
      this.disableButtonDelete = data
      this.disableButtonAddToCart = data
    })


    bus.$on( 'selectedItems', (data) => {
      this.selectedItems = data
    })


    },

    methods: {

      editItems(){
        bus.$emit('UpdateTitle', {title: 'Update Item', button: 'Update Product', kind: 0} )
        bus.$emit('editItems', this.selectedItems); 
        this.showInfoDialog = true
      },

      addItems(){
        bus.$emit('UpdateTitle', {title: 'Add Item', button: 'Add Product', kind: 1} )
        bus.$emit('resetTextField')
        this.showInfoDialog = true
      },

      deleteItems(){
        this.$CrudFunc.DeleteProduct(this.selectedItems)
      },

      addToCart(){
        bus.$emit('addtoCart', this.selectedItems); 
        this.showCart = true

      }
  },



  }
</script>