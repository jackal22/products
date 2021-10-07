import store from '../store'
import axios from 'axios'
import { bus } from '../app.js'

export class crudfunctions{
  //Private Fields
  #productsInfo;

  constructor(){
    this.#productsInfo = [];
  }

  readData = async () =>{
    try{
      let url = `${window.location.origin}/api/products`; 
      const response = await axios.get(url) 
      store.dispatch('PushFromDB', response.data) 
    }catch{
      alert('Cannot Connect to db')
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



        store.dispatch('RemoveItems', objIndex)
      })
      alert('successfully deleted');
    }catch(e){
      console.log(':', );
    }
    bus.$emit('resetSelection')
  }

  createData = async ( obj ) => {
    let isExist = false;
    let tmpItemIndex;
    let i = 0;
    





    store.state.ProductsInfos.forEach(item =>{
      if(item.id == obj.id){
        isExist = true
        tmpItemIndex = i 
      }
      i++
    })



    if(!isExist){
      store.dispatch('AddItems', obj) 

      try{
        let url = `${window.location.origin}/api/products`;
        await axios.post(url, obj)
        alert('successfully added');
        bus.$emit('resetSelection')
        this.hideDialogs()
        bus.$emit('resetSelection')
      }catch(e){
        console.log(':', e );
      }
    }else{


      if(obj.isSales == 1){
        if(obj.currentStock < obj.stocks && obj.stocks > 0){
          alert('Stocks is lower than desired quantity')
        }else{

          try{
          let url = `${window.location.origin}/api/products/${obj.id}`;
   
          obj.stocks = obj.currentStock  - obj.stocks
     


          await axios.patch(url, obj)
          

          alert('successfully added sales');
          

          store.state.ProductsInfos[tmpItemIndex].products    = obj.products
          store.state.ProductsInfos[tmpItemIndex].stocks = obj.stocks
          store.state.ProductsInfos[tmpItemIndex].price = obj.price
          bus.$emit('resetSelection')
          this.hideDialogs()
        }catch(e){
          console.log(e)
        }

        }






      }else{

        try{

          let url = `${window.location.origin}/api/products/${obj.id}`;
          await axios.patch(url, obj)
          alert('successfully updated');
                store.state.ProductsInfos[tmpItemIndex].products    = obj.products
          store.state.ProductsInfos[tmpItemIndex].stocks = obj.stocks
          store.state.ProductsInfos[tmpItemIndex].price = obj.price
          bus.$emit('resetSelection')
          this.hideDialogs()
        }catch(e){
          console.log(':', e);
        }
      }






    }

    
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

 