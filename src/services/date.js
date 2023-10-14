const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formattedDateServer = function (d = new Date()) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return `${year}/${month}/${day}`;
};



export const formattedDate3 = function (d = new Date()) {
    let month = String(d.getMonth());
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return `${day} ${months[d.getMonth()]} ${year}`;
};