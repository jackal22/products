import store from '../store'
import axios from 'axios'
import { bus } from '../app.js'

export class crudfunctions{
  constructor(){
    this.BaseUrl = `${window.location.origin}/api/products`;
    this.SalesUrl = `${window.location.origin}/api/sales`; 
    store.state.ProductList = []
    store.state.SalesList = []
    this.#GetProducts();
    this.#GetSales();
  }

  #GetProducts = async () =>{
    try{   
      const response = await axios.get(this.BaseUrl)
      store.dispatch('SetProductList', response.data)    
    }catch{
      alert('Cannot Connect to db')
    }  
  }

  #GetSales = async () =>{
    try{   
      const response = await axios.get(this.SalesUrl)
      store.dispatch('SetSalesList', response.data)    
    }catch{
      alert('Cannot get sales')
    }  
  }

  GetTotalSales = () =>{
    let tmpTotalSales = 0
    store.state.SalesList.forEach(item => {
      tmpTotalSales = tmpTotalSales + item.totalsales  
    })

    return tmpTotalSales;
  }

  AddSales = async (obj) => {
    this.hideDialogs()
    console.log(obj)
    await axios.post(this.SalesUrl, obj)
    store.dispatch('AddSales', obj)
  }



  AddProduct = async ( obj ) => {
    try{ 
      this.hideDialogs()
      store.dispatch('AddProduct', obj)
      await axios.post(this.BaseUrl, obj)
      this.#GetProducts();
      bus.$emit('resetSelection')
    }catch(e){
      console.log(':', e );
    }
  }

  UpdateProduct = async ( obj ) => {
    try{
      this.hideDialogs()     
      await axios.put(`${this.BaseUrl}/${obj.id}`, obj)
      this.#GetProducts();
      bus.$emit('resetSelection')

    }catch(e){
      console.log(e)
    }
  }

  DeleteProduct = ( itemKey ) => {
    try{
      this.hideDialogs()

      let i = 0;
      
      itemKey.forEach(key => {
        store.state.ProductList.forEach(item =>{
          if(item.id == key){
            axios.delete(`${this.BaseUrl}/${item.id}`)
            store.dispatch('RemoveProduct', i)
          }
        })
      })
      alert('successfully deleted');
      bus.$emit('resetSelection')
    }catch(e){
      console.log(':', );
    }
  }












  hideDialogs = () => {
    bus.$emit('disableEdit', true)
    bus.$emit('disableDelete', true)
    bus.$emit('hideDialogs', false)
    bus.$emit('hideCart', false)
    bus.$emit('resetSelection')
  }







}

 