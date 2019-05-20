import React from 'react';
import './Dates.css'

const Detial = ({ deti, row, col, click, mode, date }) => {
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

    const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];



    return (mode) ?
        <div className='detial' onClick={(e) => click(deti, row, col, e)}>
            {
                (deti.guaranteed) ?
                    <span className='guaranteed'>成團</span>
                    :
                    ''
            }
            <span className='status' style={{ color: color }}>{deti.status}</span>
            <span className='status'>可賣 : <i>{deti.availableVancancy}</i></span>
            <span className='status'>團位 : <i>{deti.totalVacnacy}</i></span>
            <span className='status' style={{ color: '#E10500' }}>{'$' + Math.floor(deti.price / 1000) + ',' + deti.price % 1000}</span>
        </div>
        :
        <div className='detial' style={{ flexDirection: 'row', justifyItems: 'center', }} onClick={(e) => click(deti, row, col, e)}>
            <div className='listL'>
                <span style={{ fontSize: '24px' }}>{date}</span>
                <span>{day[row]}</span>
            </div>
            <div className='listM'>
                <div style={{ paddingBottom: '5px' }}>
                    <span style={{ margin: '0 30px 0 0' }} >可賣 : {deti.availableVancancy}</span>
                    <span style={{ margin: '0 30px 0 0' }}>團位 : {deti.totalVacnacy}</span>
                </div>
                {
                    (deti.guaranteed) ?
                        <span className='guaranteedL'>成團</span>
                        :
                        ''
                }
            </div>
            <div className='listR'>
                <span style={{ color: color }}>{deti.status}</span>
                <span style={{ color: '#E10500' }}>{'$' + Math.floor(deti.price / 1000) + ',' + deti.price % 1000}</span>
            </div>
        </div>

}

export default Detial