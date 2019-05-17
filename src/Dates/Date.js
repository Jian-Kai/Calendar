import React, { useState } from 'react';
import './Dates.css'

const InDate = ({deti, row, col, click}) => {

    return <div className='detial' onClick={() => click(deti,row, col)}>
    <span style={{ color: '#FF7800' }}>{deti.status}</span>
    <span>可賣 : <i>{deti.availableVancancy}</i></span>
    <span>團位 : <i>{deti.totalVacnacy}</i></span>
    <span style={{ color: '#E10500' }}>{'$' + deti.price}</span>
</div>

}

export default InDate