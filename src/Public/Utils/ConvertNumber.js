function ConvertNumber(num) {
    num = parseInt(num);
    let formattedNumber = num.toLocaleString('de-DE');
    formattedNumber = formattedNumber + 'VND';
    return formattedNumber
}

export default ConvertNumber
