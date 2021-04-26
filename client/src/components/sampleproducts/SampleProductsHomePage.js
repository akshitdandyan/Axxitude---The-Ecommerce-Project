import React from 'react';
import Categories from '../categories/Categories';
import SampleProducts from './SampleProducts';
import {Helmet} from 'react-helmet'
function SampleProductsHomePage() {
    const styles={
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    };
    return (
        <>
        <Helmet><title>Axxitude|Think Buy Grow</title></Helmet>
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