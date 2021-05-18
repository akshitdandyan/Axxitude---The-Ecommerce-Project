import EachTProduct from './EachTProduct'
import './Trending.css'
import T2 from "./../../../media/sampleImages/TBG2.jpg"
import T1 from '../../../media/sampleImages/TBG1.jpg'
import T3 from '../../../media/sampleImages/TBG3.jpg'

const Trendings = () => {
    const TrendingItems = [
        {image:T1,brand:"Ripo",about:"Women Solid One Floral Tie Up Top",offer:"Arriving soon"},
        {image:T2,brand:"Voyage",about:"Black Lens & Round Sunglasses With Uv Protected Lens 2025MG3031B",offer:"Arriving soon"},
        {image:T3,brand:"Harpa",about:"Plain 3/4th Sleeve Ladies Rayon Casual Top, Size: M-XL",offer:"Arriving soon"}        
    ]
    return (
        <div className='Trendings'>
            <div className='trendingBlur'></div>
            <h1>New Arrivals For This Beautifull Summer</h1>
            <div className='TProductContainer'>
                {TrendingItems.map((item)=><EachTProduct details={item} />)}
            </div>
        </div>
    )
}

export default Trendings
