import React, { useState, useImperativeHandle, forwardRef } from 'react';
import moment from 'moment';
import Month from './Month/Month';
import Day from './Day/Day';
import Dates from './Dates/Dates';

const Calendar = (props, ref) => {
    const { date, month, option, mode, width, modeChange, pushDate, resetDate } = props;
    // console.log(option.initYearMonth)
    let page = month.indexOf(option.initYearMonth);
    if (page === -1) {
        let pre = moment(option.initYearMonth + '01').subtract(1, 'M').format('YYYYMM');
        let next = moment(option.initYearMonth + '01').add(1, 'M').format('YYYYMM');
        // console.log(pre)
        if (month.indexOf(pre) > -1 && month.indexOf(next) > -1)
            page = (date[pre].length > date[next].length) ? month.indexOf(pre) : month.indexOf(next);
        else if (month.indexOf(pre) > -1)
            page = month.indexOf(pre);
        else if (month.indexOf(next) > -1)
            page = month.indexOf(next);
    }

    // console.log(page);
    let cur = 0;
    let foc = 0;
    if (option.initYearMonth !== '') {
        if (page === month.length - 1) {
            cur = page - 2; foc = 2;
        } else if (page === 0) {
            cur = 0; foc = 0
        } else {
            cur = page - 1; foc = 1;
        }
    }

    const [current, setCurrent] = useState(cur);
    const [focus, setFocus] = useState(foc);
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
    const clickMon = (value, id, e) => {
        switch (value) {
            case -1:
                console.log('pre')
                if (id > 1) {
                    setFocus(id + value)
                }
                else {
                    moveMon(value);
                    current === 0 ? setFocus(0) : setFocus(1);
                }
                option.onClickPrev(e, date[month[current + focus - 1]]);
                break;
            case 1:
                console.log('next')
                if (id < 1) {
                    if (id + current < month.length - 1)
                        setFocus(id + value)
                }
                else {
                    moveMon(value);
                    current + 2 === month.length - 1 ? setFocus(2) : setFocus(1);
                }
                option.onClickNext(e, date[month[current + focus + 1]]);
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

    const initDateclick = () => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            for (let j = 0; j < newArr[i].length; j++)
                newArr[i][j] = 0
        }
        setArr(newArr);
    }

    const clickDate = (de, Dr, Dc, e) => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            for (let j = 0; j < newArr[i].length; j++)
                newArr[i][j] = 0
        }
        newArr[Dc][Dr] = 1;
        setArr(newArr)
        // console.log(e)
        option.onClickDate(e, de)
    }

    //console.log(date[month[current + focus]])

    // const inputRef = useRef(ref);
    // handle module method
    useImperativeHandle(ref, () => ({
        nextMonth: () => {
            clickMon(1, focus);
            return;
        },
        prevMonth: () => {
            clickMon(-1, focus);
            return;
        },
        switch: () => {
            modeChange();
            return;
        },
        inputData: (input) => {
            for (let i = 0; i < input.length; i++) {
                input[i].new = true;
                const newYM = moment(input[i].date).format('YYYYMM');
                //console.log(input.date)
                date[newYM].push(input[i]);
                pushDate(date, newYM);
            }
            return;
        },
        resetDate: (input) => {
            resetDate([{
                "guaranteed": true, // {boolean}
                "date": "2016/11/22", // {string} YYYY/MM/DD
                "price": "234567", // {string|number} XXXXXX | 近期上架
                "availableVancancy": 0, // {number}
                "totalVacnacy": 20, // {number}
                "status": "報名" // {string} 報名 | 後補 | 預定 | 截止 | 額滿 | 關團
            }, {
                "guaranteed": true, // {boolean}
                "date": "2016/11/20", // {string} YYYY/MM/DD
                "price": "234567", // {string|number} XXXXXX | 近期上架
                "availableVancancy": 0, // {number}
                "totalVacnacy": 20, // {number}
                "status": "報名" // {string} 報名 | 後補 | 預定 | 截止 | 額滿 | 關團
            }, ])
        }
    }));

    return <div >
        <Month width={width} current={current} focus={focus} month={month} clickMon={clickMon} option={option} />
        {
            (mode)? <Day width={width} /> : ''
        }
        
        <Dates mode={mode} width={width} data={date[month[current + focus]]} arr={arr} clickDate={clickDate} option={option} />
    </div>
}

export default forwardRef(Calendar);