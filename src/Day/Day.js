import React from 'react';
import './Day.css'

const Day = ({width}) => {
    const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    // const width = (document.body.clientWidth) / 7;
    console.log(width)
    return <div className='dayLayout'>
        {
            day.map((d, id) => {
                let classD = 'day';
                if (id === 0) classD += ' first';
                if (id === 6) classD += ' last';
                return <div key={id} className={classD} style={{ width: width }}> {d}</div>
            })
        }
    </div>
}

export default Day;