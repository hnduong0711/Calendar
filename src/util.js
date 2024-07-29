// Chú ý khi dùng fill
// Khi dùng fill để tạo lần lượt các phần tử là 1 giá trị thì đều tham chiếu đến giá trị ban đầu
// Ví dụ như tạo mảng có 5 phần tủ fill([]) thì 5 phần tử cùng tham chiếu cùng 1 mảng ban đầu
// Khi thay đổi sẽ dẫn đến 5 phần tử đều thay đổi giống nhau
import dayjs from 'dayjs'

export function getMonth(month = dayjs().month()){
    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 -firstDayOfMonth ;
    const dayMatrix = new Array(5).fill([]).map(() => {
         return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        })
    })
    return dayMatrix;
}