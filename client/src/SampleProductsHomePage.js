import React from 'react';
import Categories from './components/categories/Categories';
import SampleProducts from './components/sampleproducts/SampleProducts';
function SampleProductsHomePage() {
    const styles={
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    };
    return (
        <>
            <div style={styles}>
                <section>
                    <Categories />
                </section>
                <section>
                    <Categories />
                </section>
            </div>
            <div className="sampleproducts">
                <SampleProducts />
            </div>
        </>
    )
}
export default SampleProductsHomePage;