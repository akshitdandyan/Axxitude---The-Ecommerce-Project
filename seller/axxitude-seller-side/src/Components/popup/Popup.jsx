import { useSelector,useDispatch } from 'react-redux';
import { HIDE_POP_UP } from '../Constants/Constants';
import './popup.css';

function Popup() {
    
    const dispatch = useDispatch();
    const popUpContent = useSelector(state => state.pop_up_reducer);
    const popUpVisibility = useSelector(state => state.pop_up_visibility);

    return (
        <div className="popUpContainer">
            <div className={popUpVisibility ? 'the_pop_up show_the_pop_up' : 'the_pop_up'}>
                <div className='title_of_pop_up' >{popUpContent.title}</div>
                <div className='body_of_pop_up' >{popUpContent.body}</div>
                <div onClick={()=>dispatch({type:HIDE_POP_UP})} className="btn">Close</div>
            </div>
        </div>
    )
}

export default Popup
