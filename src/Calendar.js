import React, { useState } from 'react';

import Month from './Month/Month';
import Day from './Day/Day';
import Dates from './Dates/Dates';

const Calendar = ({ date, month }) => {

    const [current, setCurrent] = useState(0);
    const [focus, setFocus] = useState(0);

    const [arr, setArr] = useState(
        () => {
            const col = 6;
            const row = 7;
            let temp = [];
            for (let i = 0; i < col; i++) {
                let temp2 = [];
                for (let j = 0; j < row; j++) {
                    temp2.push(0)
                }
                temp.push(temp2)
            }
            return temp;
        }
    )
    
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
                //initDateclick();
                break;
            case 1:
                console.log('next')
                if (id < 1)
                    setFocus(id + value)
                else {
                    moveMon(value);
                    current + 2 === month.length - 1 ? setFocus(2) : setFocus(1);
                }
                //initDateclick();
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
        initDateclick();
    }

    const initDateclick = () =>{
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            for (let j = 0; j < newArr[i].length; j++)
                newArr[i][j] = 0
        }
        setArr(newArr);
    }

    const clickDate = (de, Dr, Dc) => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            for (let j = 0; j < newArr[i].length; j++)
                newArr[i][j] = 0
        }
        newArr[Dc][Dr] = 1;
        setArr(newArr)
        console.log(arr[Dc][Dr])
    }

    // console.log(date[month[current + focus]])

    return <div>
        <Month current={current} focus={focus} month={month} clickMon={clickMon} />
        <Day />
        <Dates date={date} month={month} current={current} focus={focus} arr={arr} clickDate={clickDate}/>
    </div>
}

export default Calendar;