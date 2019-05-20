import React from 'react';
import './Day.css'

const Day = ({width}) => {
    const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const thewidth = (width) / 7;
    // console.log(width)
    return <div className='dayLayout'>
        {
            day.map((d, id) => {
                let classD = 'day';
                if (id === 0) classD += ' first';
                if (id === 6) classD += ' last';
                return <div key={id} className={classD} style={{ width: thewidth }}> {d}</div>
            })
        }
    </div>
}

export default Day;