import React from 'react';
import './Dates.css'
import moment from 'moment';

import InDate from './Date';

const Dates = ({ date, month, focus, current, arr, clickDate }) => {

    const width = (document.body.clientWidth) / 7;

    const thisMon = date[month[current + focus]];
    let calendarArr = [];
    for (let i = 0; i < thisMon.length; i++) {
        let found = calendarArr.find((trip) => trip.date === thisMon[i].date);
        if (!found)
            calendarArr.push(thisMon[i])
        else {
            let index = calendarArr.indexOf(found);
            if (thisMon[i].price < found.price)
                calendarArr[index] = found
        }
    }
    calendarArr.sort((a, b) => a.date > b.date ? 1 : -1)
    // console.log(thisMon)
    // console.log(calendarArr)
    let Y = moment(new Date(thisMon[0].date)).format("YYYY");
    let M = moment(new Date(thisMon[0].date)).format("MM");
    const firstDay = moment(new Date(Y + '/' + M + '/01')).day();
    const start = moment([Y, M - 1]);
    const final = moment(start).endOf('month').toDate().getDate() + firstDay;

    let count = 0;
    const Sdetial = (deti, r, c) => {
        if (count < calendarArr.length - 1)
            count++;
        if (deti !== null) {
            return <InDate deti={deti} row={r} col={c} click={clickDate} />
        }
    }

    return <div className='dateLayout'>
        {
            arr.map((cols, colid) => {
                return cols.map((rows, rowid) => {
                    let classD = (rowid === 6) ? 'date sat' : 'date';
                    if (colid * 7 + rowid >= firstDay && colid * 7 + rowid < final)
                        classD += ' exist'
                    // if (rows.pos > 0) classD += ' exist';
                    if (arr[colid][rowid] === 1) classD += ' clicked';
                    return (

                        <div key={rowid} className={classD} style={{ width: width }}>
                            {
                                (colid * 7 + rowid >= firstDay && colid * 7 + rowid < final) ?
                                    <span className='num'>
                                        {colid * 7 + rowid - firstDay + 1}
                                    </span>
                                    :
                                    ''
                            }
                            {
                                (colid * 7 + rowid - firstDay + 1 === moment(new Date(calendarArr[count].date)).date()) ?
                                    Sdetial(calendarArr[count], rowid, colid)
                                    :
                                    ''
                            }
                        </div>
                    )
                })

            })
        }
    </div>
}

export default Dates;