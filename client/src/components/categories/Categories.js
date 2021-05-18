import React from 'react';
import { useDispatch } from 'react-redux';
import './categories.css';

function Categories() {
    const dispatch = useDispatch();
    return (
       <div className='categories'>
           <div className='categoryItem' onClick={()=>dispatch({type:"CHANGECATEGORY",payload:"fashion"})}>
               <div><i class="fas fa-tshirt"></i></div>
               <div>Fashion</div>
           </div>
           <div className='categoryItem' onClick={()=>dispatch({type:"CHANGECATEGORY",payload:"jewelery"})}>
               <div><i class="fas fa-gem"></i></div>
               <div>Jewellery</div>
            </div>
           <div className='categoryItem' onClick={()=>dispatch({type:"CHANGECATEGORY",payload:"electronics"})}>
               <div><i class="fas fa-laptop"></i></div>
               <div>Electronics</div>
            </div>
           <div className='categoryItem' onClick={()=>dispatch({type:"CHANGECATEGORY",payload:"grocery"})}>
               <div><i class="fas fa-shopping-basket"></i></div>
               <div>Grocery</div>
            </div>
           <div className='categoryItem' onClick={()=>dispatch({type:"CHANGECATEGORY",payload:"other"})}>
               <div><i class="fas fa-feather-alt"></i></div>
               <div>Other</div>
            </div>
       </div>
    )
}
export default Categories;