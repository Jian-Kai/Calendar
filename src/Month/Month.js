import React, { useState } from 'react'
import './Month.css'

import moment from 'moment';

const Month = ({ current, month, moveMon }) => {
    const width = (document.body.clientWidth - 40) / 3;
    const show = [month[current], month[current + 1], month[current + 2]];

    const [focus, setFocus] = useState(0)

    //console.log(current)
    const clickMon = (value, id) => {
        switch (value) {
            case -1:
                console.log('pre')
                if (id > 1)
                    setFocus(id + value)
                else {
                    moveMon(value);
                    current === 0 ? setFocus(0) : setFocus(1);
                }
                break;
            case 1:
                console.log('next')
                if (id < 1)
                    setFocus(id + value)
                else {
                    moveMon(value);
                    current + 2 === month.length - 1 ? setFocus(2) : setFocus(1);
                }
                break;
            case 0:
                console.log('month');
                switch (id) {
                    case 0:
                        current === 0 ? setFocus(0) : setFocus(1);
                        moveMon(-1);
                        break;
                    case 1:
                        setFocus(1)
                        break;
                    case 2:
                        current + 2 === month.length - 1 ? setFocus(2) : setFocus(1);
                        moveMon(1);
                        break;
                    default:
                }
                break;
            default:
        }
    }
    return (
        <div className='monthLayout'>
            <a className='btn pre' onClick={() => clickMon(-1, focus)}></a>
            <ul className='month'>
                {
                    show.map((li, index) => {
                        const style = {
                            width: width,
                        }
                        let tab_class = (focus === index) ? 'tab now' : 'tab';
                        let Y = li.slice(0, 4);
                        let M = li.slice(4, li.length)
                        return <li key={index} className={tab_class} style={style} onClick={() => clickMon(0, index)}>
                            <a>
                                <span>
                                    {Y + ' ' + M + '月'}
                                </span>
                            </a>
                        </li>
                    })
                }
            </ul>
            <a className='btn next' onClick={() => clickMon(1, focus)}></a>
        </div>
    )
}

export default Month;