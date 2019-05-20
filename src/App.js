import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
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

function Switch(props) {
    const { mode, modeChange } = props;

    return <div onClick={modeChange}>
        {
            (mode) ? '切換列表模式' : '切換月曆模式'
        }
    </div>
}


const App = () => {

    const [data, setData] = useState([]);
    const [mode, setMode] = useState(false);
    const [size, setSize] = useState(getSize)
    let date = {};
    let month = [];
    // console.log(document.body.clientWidth)
    async function fetchData(name = 'data1') {
        const response = await fetch('./json/' + name + '.json');
        const json = await response.json();
        setData(json);
    }

    function handleWindowChange() {
        setSize(getSize);
    };

    function getSize() {
        return (document.body.clientWidth * 0.9);
    }

    const init = async () => {
        await fetchData();
        handleWindowChange();
        window.addEventListener('resize', handleWindowChange);
        window.Cal = inputEl;
    }

    useEffect(() => {
        init();
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

    const modeChange = () => {
        let newMode = mode;
        setMode(!newMode)
    }

    const option = {
        initYearMonth: '',
        dataKeySetting: {
            // 保證出團
            'guaranteed': 'certain',
            // 狀態
            'status': 'state',
            // 可賣團位
            'availableVancancy': 'onsell',
            // 團位
            'totalVacnacy': 'total',
            // 價格
            'price': 'price'
        },
        // 點上一個月時
        onClickPrev: function (e, data) {
            console.log('prev')
            if (e) console.log(e.target);
            console.log(data, window.Calendar);
        },
        // 點下一個月時
        onClickNext: function (e, data) {
            console.log('next');
            if (e) console.log(e.target);
            console.log(data, window.Calendar)
        },
        // 點日期時
        onClickDate: function (e, data) {
            console.log(e.target, data);
        }
    }

    const inputEl = useRef(null);

    const pushDate = (input, YM) =>{
        console.log(input);
        let temp = []
        for(let i in input){
            for(let j = 0; j < input[i].length; j++)
                temp.push(input[i][j])
        }
        setData(temp);
        console.log(data);
    }

    return (
        <div >
            <Dropdown fetch={fetchData} />
            <Switch mode={mode} modeChange={modeChange} />
            <br />
            {
                (data.length > 0) ? <Calendar date={date} pushDate={pushDate} month={month} option={option} mode={mode} width={size} modeChange={modeChange} ref={inputEl} /> : ''
            }
        </div>)
}

export default (App);