/* eslint-disable */
function truncateString(str: string , maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength) + "...";
    }
}

export default truncateString;