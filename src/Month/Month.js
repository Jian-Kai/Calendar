import React from 'react'
import './Month.css'

const Month = ({ current, focus, month, clickMon }) => {
    const width = (document.body.clientWidth - 40) / 3;
    const show = [month[current], month[current + 1], month[current + 2]];

    console.log('current:' + current);
    console.log('focus:' + focus);

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