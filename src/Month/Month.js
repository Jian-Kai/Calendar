import React, { useState } from 'react'
import './Month.css'

import moment from 'moment';

const Month = ({ current, month, moveMon }) => {
    const width = (document.body.clientWidth - 40) / 3;
    const show = [month[current], month[current + 1], month[current + 2]];

    const [focus, setFocus] = useState(0)

    //console.log(current)
    const clickMon = (id) => {
        console.log('click mon')
        console.log(id)
        if (id === 2 && (current + 2) < month.length - 1) {
            moveMon(1)
            setFocus(1)
        } else if (id === 0 && current > 0) {
            moveMon(-1)
            setFocus(1)
        }
        else {
            setFocus(id)
        }

    }
    return (
        <div className='monthLayout'>
            <a className='btn pre' onClick={() => moveMon(-1)}></a>
            <ul className='month'>
                {
                    show.map((li, index) => {
                        const style = {
                            width: width,
                        }
                        let tab_class = (focus === index) ? 'tab now' : 'tab';
                        let Y = li.slice(0,4);
                        let M = li.slice(4, li.length)
                        return <li key={index} className={tab_class} style={style} onClick={() => clickMon(index)}>
                            <a>
                                <span>
                                    {Y + ' ' + M + '月'}
                                </span>
                            </a>
                        </li>
                    })
                }
            </ul>
            <a className='btn next' onClick={() => moveMon(1)}></a>
        </div>
    )
}

export default Month;