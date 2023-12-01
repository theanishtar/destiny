import { Pipe, PipeTransform } from '@angular/core';
import { MessageService } from './user/service/message.service';
@Pipe({
    name: 'customDateTime'
})
export class CustomTimePipe implements PipeTransform {

    $chatHistory: any;
    checkedUsers: any[];
    checkedUsersRep: any[];
    checkUserCalled: boolean = false;

    constructor(
        private messageService: MessageService
    ) { }

    transform(value: string, type?: 'date' | 'time'): string | any[] {
        if (type === 'date') {
            return this.checkDate(value);
        } else if (type === 'time') {
            return this.getCustomTime(value);
        } else {
            // return this.getCheckedUsers(value);
            return '';
        }
    }

    public checkDate(date: string): string {

        if (date == '' || date == null)
            return '';
        let date1 = new Date(date.substring(0, 10));

        let d = new Date();
        let day = d.getDate(); // Lấy ngày trong tháng (1-31)
        let month = d.getMonth() + 1; // Lấy tháng (0-11), nên cộng thêm 1
        let year = d.getFullYear();
        let date2 = new Date(year + '-' + month + '-' + day);
        if (date1 < date2 && (month>date1.getMonth()+1 || year>date1.getFullYear()) && date2.getDate() - 1 === date1.getDate()) {
            return 'Hôm qua';
        } else if (date1 < date2 && (date2.getDate() - 1 > date1.getDate() || month > date1.getMonth() + 1 || year>date1.getFullYear())) {
            let year = date1.getFullYear() < date2.getFullYear() ? '-' + date1.getFullYear() : '';
            let month =
                date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : '' + (date1.getMonth() + 1);
            let day = date1.getDate() < 10 ? '0' + date1.getDate() : '' + date1.getDate();
            return day + '-' + month + year;
        } else {
            return 'Hôm nay';
        }
    }

    public getCustomTime(time: string): string {
        if (this.messageService.checkScroll === this.messageService.listMessages.length) {
            this.$chatHistory = $('.chat-widget-conversation')!;
            this.$chatHistory.scrollTop(this.$chatHistory[0]!.scrollHeight);
        }
        let date = new Date(time);
        let hours = (date.getHours() < 10) ? '0' + (date.getHours()) : (date.getHours());
        let minutes = (date.getMinutes() < 10) ? '0' + (date.getMinutes()) : (date.getMinutes());
        let newTime = hours + ':' + minutes;
        this.messageService.checkScroll++;
        return newTime;
    }
}
