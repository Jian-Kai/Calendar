import React, { useState, useEffect } from 'react';
import moment from 'moment';


import Calendar from './Calendar';

const Dropdown = ({ fetch }) => {
    return (
        <select onChange={(e) => { fetch(e.target.value) }}>
            <option value="data1">data1</option>
            <option value="data2">data2</option>
            <option value="data3">data3</option>
            <option value="data4">data4</option>
        </select>
    )
}

const App = () => {
    const [data, setData] = useState([]);

    let date = {};
    let month = [];

    async function fetchData(name = 'data1') {
        const response = await fetch('./json/' + name + '.json');
        const json = await response.json();
        setData(json);
    }

    useEffect(() => {
        fetchData()
    }, []);

    data.map(d => {
        let YM = moment(new Date(d.date)).format("YYYYMM");
        if (date[YM])
            date[YM].push(d);
        else {
            date[YM] = [d];
            month.push(YM);
        }
        return true;
    });
    month.sort()
    console.log(date);
    console.log(month);



    return (
        <div>
            <Dropdown fetch={fetchData} />
            {
                (data.length > 0)? <Calendar date={date} month={month}/> :''
            }
        </div>)
}

export default App;