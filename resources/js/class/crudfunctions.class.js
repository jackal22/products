import store from '../store'
import axios from 'axios'
import { bus } from '../app.js'

export class crudfunctions{

  constructor(){
    this.BaseUrl = `${window.location.origin}/api/products`;
    this.#GetProducts();
  }

  #GetProducts = async () =>{
    try{   
      const response = await axios.get(this.BaseUrl)
      store.dispatch('SetProductList', response.data)
    }catch{
      alert('Cannot Connect to db')
    }  
  }

  AddProduct = async ( obj ) => {
    try{ 
      this.hideDialogs()
      store.dispatch('AddProduct', obj)
      await axios.post(this.BaseUrl, obj)
      
      bus.$emit('showLoading', true);
      bus.$emit('resetSelection')
    }catch(e){
      console.log(':', e );
    }
  }








    deleteData = ( keyArr ) => {
    try{
      keyArr.forEach(id =>{   
        
        const objIndex = store.state.ProductsInfos.map(function(e) {
                           return e.id;
                         }).indexOf(id);


        let url = `${window.location.origin}/api/products/${ id }`;




        axios.delete(url)



        store.dispatch('RemoveProduct', objIndex)
      })
      alert('successfully deleted');
    }catch(e){
      console.log(':', );
    }
    bus.$emit('resetSelection')
  }


    







  editData = ( keyArr ) =>{
    if(keyArr.length > 1){
      alert('multiple items not allowed!')
    }else{
      bus.$emit('hideDialogs', true)
      bus.$emit('editItems', keyArr[0])

    }
    bus.$emit('resetSelection')
  }












    hideDialogs = () => {
    bus.$emit('hideDialogs', false)
    bus.$emit('resetSelection')
  }







}

 