import React from 'react'
import './Month.css'

const Month = ({ width, current, focus, month, clickMon }) => {
    const thewidth = (width - 40) / 3;
    let show = [month[current], month[current + 1], month[current + 2]];

     console.log('current:' + current);
     console.log('focus:' + focus);

    return (
        <div className='monthLayout'>
            <a className='btn pre' onClick={(e) => clickMon(-1, focus, e)}></a>
            <ul className='month' >
                {
                    show.map((li, index) => {
                        const style = {
                            width: thewidth,
                        }
                        let tab_class = (focus === index) ? 'tab now' : 'tab';
                        // console.log(li)
                        let Y = li.slice(0, 4);
                        let M = li.slice(4, li.length)
                        return <li key={index} className={tab_class} style={style} onClick={(e) => clickMon(0, index, e)}>
                            <a>
                                <span>
                                    {Y + ' ' + M + '月'}
                                </span>
                            </a>
                        </li>
                    })
                }
            </ul>
            <a className='btn next' onClick={(e) => clickMon(1, focus, e)}></a>
        </div>
    )
}

export default Month;