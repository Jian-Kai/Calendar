import React from 'react';
import './Dates.css'

const Detial = ({ deti, row, col, click, mode }) => {
    let color;
    switch (deti.status) {
        case '報名':
            color = '#24a07c';
            break;
        case '後補':
            color = '#24a07c';
            break;
        case '預定':
            color = '#24a07c';
            break;
        case '截止':
            color = '#ff7800';
            break;
        case '額滿':
            color = '#ff7800';
            break;
        case '關團':
            color = '#ff7800';
            break;
        default:
    }
    return <div className='detial' onClick={() => click(deti, row, col)}>
        <span style={{ color: color }}>{deti.status}</span>
        <span>可賣 : <i>{deti.availableVancancy}</i></span>
        <span>團位 : <i>{deti.totalVacnacy}</i></span>
        <span style={{ color: '#E10500' }}>{'$' + deti.price}</span>
    </div>

}

export default Detial