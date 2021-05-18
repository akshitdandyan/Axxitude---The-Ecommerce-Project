import { useSelector } from 'react-redux'
import './Analytics.css'
import ProductCard from '../Dashboard/SellerDataContainer/DC2/ProductCard'

const Analytics = () => {
    const sellerdata = useSelector(state => state.sellerdata[0])
    const sellerProducts =useSelector(state => state.sellerproducts_)
    return (
        <div className='Analytics'>
            <h1 className='analytic-heading'>
                <i className="far fa-chart-bar"></i>{" "}
                AXXITUDE ANALYTICS
                {" "}<i className="fas fa-chart-line"></i>
            </h1>
            <h1 className="analytic-heading-2">
                Axxitude Seller Side lets you to analyse your products
                so you can market your products accordingly, at no cost.
            </h1>
            <div className='ProductAnalysis'>
                <div className='ProductAnalysisChild'>
                    <div className='ProductAnalysisTitle'>
                        Business
                    </div>
                    <div className='ProductAnalysisData'>
                        {sellerdata.BusinessName}
                    </div>
                </div>
                <div className='ProductAnalysisChild'>
                    <div className='ProductAnalysisTitle'>
                        Total Products Launched
                    </div>
                    <div className='ProductAnalysisData'>
                        {sellerdata.TotalProducts}
                    </div>
                </div>
                <div className='ProductAnalysisChild'>
                    <div className='ProductAnalysisTitle'>
                        Total Clicks On Your All Products Till Now
                    </div>
                    <div className='ProductAnalysisData'>
                        {sellerdata.ProductsClicked}
                    </div>
                </div>
                <div className='ProductAnalysisChild'>
                    <div className='ProductAnalysisTitle'>
                        Products Sold
                    </div>
                    <div className='ProductAnalysisData'>
                        {sellerdata.ProductsSold}
                    </div>
                </div>
            </div>
            
            <h1 className='ALLPRODUCTHEADING'>All Your Products That Are Live On Axxitude</h1>
            <p className='Promotional'>
                <i className="fas fa-info-circle"></i> Try Axxitude Advertising for Boosting the sale of your products
            </p>
            <p className='Promotional'>
                <i className="fas fa-info-circle"></i> If you want to remove any product from the store, simpy press <i className="fas fa-trash"></i>, and will be removed within no time.
            </p>
            <div className="ProductAnalysisContainer">
                {
                    sellerProducts.map((item)=><ProductCard props = {item} />)
                }
            </div>
        </div>
    )
}

export default Analytics
