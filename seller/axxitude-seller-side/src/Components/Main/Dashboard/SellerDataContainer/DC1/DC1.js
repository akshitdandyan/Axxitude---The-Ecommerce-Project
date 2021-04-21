import React from 'react'

const DC1 = () => {
    return (
        <div className='DC1'>
            <div className='DC1_box'>
                <i className="fas fa-file-invoice"></i>
                <p className='DC1_state_type'>Bank</p>
                <p className='DC1_state_false'>
                    Not Provided
                </p>
                <p className='DC1_state_provide'>
                    Upload Now
                </p>
            </div>

            <div className='DC1_box'>
                <i className="fas fa-file-invoice"></i>
                <p className='DC1_state_type'>Email</p>
                <p className='DC1_state_true'>
                    <i className="far fa-check-circle"></i>
                    Provided
                        </p>
                <p className='DC1_state_provide'>
                    {/* Upload Now */}
                </p>
            </div>

            <div className='DC1_box'>
                <i className="fas fa-file-invoice"></i>
                <p className='DC1_state_type'>Phone</p>
                <p className='DC1_state_false'>
                    Not Provided
                </p>
                <p className='DC1_state_provide'>
                    Upload Now
                </p>
            </div>
        </div>
    )
}

export default DC1