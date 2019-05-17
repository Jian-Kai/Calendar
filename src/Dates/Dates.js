import React, { useState } from 'react';
import './Dates.css'
import moment from 'moment';

import InDate from './Date';

const Dates = ({ date, month, focus, current }) => {
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
    const width = (document.body.clientWidth) / 7;

    const thisMon = date[month[current + focus]];
    let calendarArr = [];

    let Y = moment(new Date(thisMon[0].date)).format("YYYY");
    let M = moment(new Date(thisMon[0].date)).format("MM");
    const firstDay = moment(new Date(Y + '/' + M + '/01')).day();
    const start = moment([Y, M - 1]);
    const final = moment(start).endOf('month').toDate().getDate() + firstDay;
    let count = 1;
    const col = 6;
    const row = 7;
    for (let i = 0; i < col; i++) {
        let temp = [];
        for (let j = 0; j < row; j++) {
            let detial = null;
            if (i * 7 + j >= firstDay && i * 7 + j < final) {
                temp.push({
                    detial: detial,
                    pos: count,
                    clicked: false
                });
                count++;
            }
            else temp.push({
                detial: detial,
                pos: 0,
                clicked: false
            })
        }
        calendarArr.push(temp);
    }

    for (let i = 0; i < thisMon.length; i++) {
        let thisDate = moment(thisMon[i].date).date() + firstDay - 1;
        let c = Math.floor(thisDate / 7);
        let r = thisDate % 7;
        calendarArr[c][r].detial = thisMon[i];
    }

    const Sdetial = (deti, r, c) => {
        const click = (de, Dr, Dc) => {
            let newArr = [...arr];
            for(let i = 0; i < newArr.length; i++){
                for(let j = 0; j < newArr[i].length; j++)
                newArr[i][j] = 0
            }
            newArr[Dc][Dr] = 1;
            setArr(newArr)
            console.log(arr[Dc][Dr])
        }
        if (deti !== null) {
            return <InDate deti={deti} row={r} col={c} click={click} />
        }
    }

    return <div className='dateLayout'>
        {
            calendarArr.map((cols, colid) => {
                return <div key={colid} className='week'>
                    {
                        cols.map((rows, rowid) => {
                            let classD = (rowid === 6) ? 'date sat' : 'date';
                            if (rows.pos > 0) classD += ' exist';
                            if (arr[colid][rowid] === 1) classD += ' clicked';
                            return (
                                (rows.pos === 0) ?
                                    <div key={rowid} className={classD} style={{ width: width }}></div>
                                    :
                                    <div key={rowid} className={classD} style={{ width: width }}>
                                        <span className='num'>
                                            {rows.pos}
                                        </span>
                                        {
                                            Sdetial(rows.detial, rowid, colid)
                                        }
                                    </div>
                            )
                        })
                    }
                </div>
            })
        }
    </div>
}

export default Dates;