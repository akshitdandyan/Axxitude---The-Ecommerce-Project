import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewPopUp } from "../actions/actions";
import { postreview } from "../api"
import {useHistory} from 'react-router-dom'

function Reviews(props) {
    const history = useHistory()
    const productDetails = props.productDetails;
    const userName = props.userData.firstname;
    const isLogged = useSelector(state=>state.isLoggedReducer)
    const reviewer = {name:userName,date:Date()}
    const productReviews =props.productDetails.Reviews;
    const [reviewText,setReviewText] = useState("");
    const dispatch = useDispatch()
    return (
        <div className='review'>
            <h1>Reviews <i class="fas fa-star-half-alt"></i></h1>
            <div className='addNewReview'>
                <input type="text"
                 placeholder="Write your review here..." 
                 value={reviewText}
                 onChange={(e)=>setReviewText(e.target.value)}
                 />
                <button onClick={()=>{
                    if(isLogged===false){
                        const popUpData = {title:"Not Signed In",body:"Login Or Register to buy and review products."};
                        dispatch(setNewPopUp(popUpData))
                        history.push('register')
                        return
                    }
                    if(reviewText===""){
                        const popUpData = {title:"Empty Review",body:"You cannot post an empty review😒."};
                        dispatch(setNewPopUp(popUpData))
                        return
                    }
                    postreview(productDetails._id,reviewText,reviewer);
                    setReviewText("")
                    const popUpData = {title:"Review Posted",body:"Thanks for Posting your Review. Happy Shopping!"};
                    dispatch(setNewPopUp(popUpData))
                    }}>Post Review</button>
            </div>
            <div className='allReviews'>
                {productReviews===undefined || productReviews.length===0?
                    <h1 style={{color:"grey",textAlign:"center",margin:"40px"}}>No reviews yet</h1>
                    :<div>
                        {productReviews.map((review)=><div className='eachReview'>
                            <p className='reviewerName'>{review.reviewer.name} <span className='reviewDate'>{(review.reviewer.date).slice(0,15)}</span></p>
                            <p className='the_review_content'>{review.review}</p>
                        </div>)}
                    </div>    
                }
            </div>
        </div>
    )
}

export default Reviews
