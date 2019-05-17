import React, { useState } from 'react';

import Month from './Month/Month';

const Calendar = ({ data, month }) => {

    const [current, setCurrent] = useState(0);
    

    const moveMon = function (value) {
        let newCurrent = current;
        if ((value > 0 && current + 2 < month.length - 1) || (value < 0 && current > 0)) {
            newCurrent += value;
        }
        setCurrent(newCurrent)
    }

    return <div>
        <Month current={current} month={month} moveMon={moveMon} />
    </div>
}

export default Calendar;