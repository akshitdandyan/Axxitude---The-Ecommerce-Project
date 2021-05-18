import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const DC1 = () => {
    const sellerdata = useSelector(state=>state.sellerdata)
    const [bank,setBank] =useState(false)
    const [show,setShow]=useState(false)
    return (sellerdata===undefined || sellerdata[0]===undefined?'':
    <>
    <div className={show===true?'detailasker opop':'detailasker popo'}>
        <h4>Enter Your Bank Details</h4>
        <p>Please do not fill any sensitive information</p>
        <input placeholder="Type Here" />
        <button onClick={()=>{
            setShow(false)
            setBank(true)
            }}>Submit</button>
    </div>
        <div className='DC1'>
            <div className='DC1_box'>
                <i className="fas fa-money-check-alt"></i>
                <p className='DC1_state_type'>Bank</p>
                {bank===false?
                <><p className='DC1_state_false'>
                    Not Provided
                </p>
                <p className='DC1_state_provide' onClick={()=>setShow(true)}>
                    Upload Now
                </p></>:
                <p className='DC1_state_true'>
                <i className="far fa-check-circle"></i>
                Provided
                    </p>
                }
            </div>

            <div className='DC1_box'>
                <i className="fas fa-envelope-square"></i>
                <p className='DC1_state_type'>Email</p>
                {sellerdata[0].Email!==''?<p className='DC1_state_true'>
                    <i className="far fa-check-circle"></i>
                    Provided
                        </p>:
                <><p className='DC1_state_false'>
                Not Provided
            </p>
            <p className='DC1_state_provide'>
                Upload Now
            </p></>}
            </div>

            <div className='DC1_box'>
                <i className="fas fa-phone-square-alt"></i>
                <p className='DC1_state_type'>Phone</p>
                {sellerdata[0].ContactNumber!==""?<p className='DC1_state_true'>
                    <i className="far fa-check-circle"></i>
                    Provided
                        </p>:
                <><p className='DC1_state_false'>
                Not Provided
            </p>
            <p className='DC1_state_provide'>
                Upload Now
            </p></>}
            </div>
        </div>
        </>
    )
}

export default DC1