import React, { useState, useEffect } from 'react';

import Month from './Month/Month';
import Day from './Day/Day';
import Dates from './Dates/Dates';

const Calendar = ({ date, month }) => {

    const [current, setCurrent] = useState(0);
    const [focus, setFocus] = useState(0);
    
    // handle month bar moving when it need move
    const moveMon = (value) => {
        let newCurrent = current;
        if ((value > 0 && current + 2 < month.length - 1) || (value < 0 && current > 0)) {
            newCurrent += value;
        }
        setCurrent(newCurrent);
    }
    // handle month bar click
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

    // console.log(date[month[current + focus]])

    return <div>
        <Month current={current} focus={focus} month={month} clickMon={clickMon} />
        <Day />
        <Dates date={date} month={month} current={current} focus={focus} />
    </div>
}

export default Calendar;