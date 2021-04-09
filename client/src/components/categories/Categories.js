import React, { useState } from 'react';
import './categories.css';
import CategoriesTable from './categoriestable/CategoriesTable';
function Categories() {
    var [showCategories, changeShowCategories] = useState(false);
    return (
        !showCategories ?
            <h1 className="tableheading">
                Categories
                <span>
                    <i className="fas fa-arrow-circle-down" onClick={() => changeShowCategories(true)}></i>
                </span>
            </h1>
            :
            <div>
                <h1 className="tableheading">
                    Categories
                    <span>
                        <i className="fas fa-arrow-circle-up" onClick={() => changeShowCategories(false)}></i>
                    </span>
                </h1>
                <CategoriesTable />
            </div>

    )
}
export default Categories;