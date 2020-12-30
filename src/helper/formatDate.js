import moment from 'moment';
export function formatDate(date) {
    let x = moment(date).local().toDate()
    return x.toLocaleDateString();
}