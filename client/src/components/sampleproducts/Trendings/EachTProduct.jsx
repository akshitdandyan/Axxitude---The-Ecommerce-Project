import './Trending.css'

const EachTProduct = (props) => {
    const details = props.details
    return (
        <div className='EachTProduct'>
            <img  src={details.image} alt='sponsored' />
            <div className="TDetails">
                <div className="TName">
                    {details.brand}
                </div>
                <div className='TDescription'>
                    {details.about}
                </div>
                <div className="TTiming">
                    {details.offer}
                </div>

            </div>
        </div>
    )
}

export default EachTProduct
