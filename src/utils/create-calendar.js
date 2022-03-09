const makeCalendar = (year, month) => {
    // sun(0) - sat(6)
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    // day(28-31)
    let endDateOfMonth = new Date(year, month + 1, 0).getDate();

    let cnt = 1;
    let days = []
    for (let i = 0; i < 5; i++) {
        let _days = [];
        for (let j = 0; j < 7; j++) {
            if (cnt > endDateOfMonth) {
                _days.push("");
            } else if (firstDayOfMonth > j && i === 0) {
                _days.push("");
            } else {
                _days.push(cnt);
                cnt++;
            }
        }
        days = [...days, ..._days]
    }
    return days
}

export default makeCalendar