import React from 'react';
import EachCategory from './EachCategory';
function CategoriesTable(){
    return(
        <div className="categoriestable">
                <EachCategory type="Mobiles" />
                <EachCategory type="Clothing" />
                <EachCategory type="Ebooks" />
                <EachCategory type="Home Appliances" />
                <EachCategory type="Fitness" />
        </div>
    )
}
export default CategoriesTable;