export default {
    methods: {
        currentDay() {
            let date = new Date()
            return date.getDate()
        },
        mixinDayNonOrdinal(fullDate) {
            let date = new Date(fullDate);
            return ("0" + date.getDate()).slice(-2)
        },
        mixinSubstringDate(fullDate) {
            const monthNamesLong = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            const monthNamesShort = monthNamesLong.map(month =>
                month.substring(0, 3)
            );
            let date = new Date(fullDate);
            let dateObj = {
                longApptMonth: monthNamesLong[date.getMonth()],
                shortApptMonth: monthNamesShort[date.getMonth()],
                day: ("0" + date.getDate()).slice(-2) + this.ordinalDay(("0" + date.getDate()).slice(-2)),

                time: Math.abs(date.getHours() - 12) +
                    ":" +
                    ("0" + date.getMinutes()).slice(-2) +
                    " " +
                    (date.getHours() < 12 ? "AM" : "PM")
            };
            return dateObj;
        },
        durationMixin(start, end) {
            let apptStart = new Date(start);
            let apptEnd = new Date(end);

            let x = apptStart.getHours() * 60 + apptStart.getMinutes();
            let y = apptEnd.getHours() * 60 + apptEnd.getMinutes();

            return y - x;
        },
        ordinalDay(d) {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        }
    }
}