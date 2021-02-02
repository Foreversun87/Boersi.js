import moment from 'moment';
export function formatDate(date) {
    let x = moment(date).local().toDate()
    return moment(date).format("DD.MM.YYYY");
}

export function isBefore(date){
    let compareDate = moment(date, "YYYY-MM-DD");
    let today = moment(new Date(), "YYYY-MM-DD");
    return compareDate.isBefore(today, "day");
}