<template>
  <div class="single-appt">
    <div class="single-appt__apptItem--timeInfo">
      <span class="single-appt__apptItem--shortDate">{{shortMonth}} {{dateDay}}</span>
      <span class="single-appt__apptItem--blockDisplay">{{dateTime}}</span>
      <span class="single-appt__apptItem--blockDisplay">{{apptDuration}}</span>
    </div>
    <div class="single-appt__apptItem">
      <div class="single-appt__apptItem--attendeeInfo">
        <img :src="apptData.avatar" class="single-appt__apptItem--itemImage">
        <div class="single-appt__apptItem--colItem">
          <span>{{fullName}}</span>
          <span>
            <span class="icon-button material-icons">location_on</span>
            {{apptData.location.place}}
          </span>
        </div>
      </div>
      <div class="single-appt__apptItem--longDate">
        <span>{{longMonth}} {{dateDay}}</span>
        <colored-text-status :textStatus="apptData.status"/>
      </div>
      <div class="single-appt__apptItem--cardActions">
        <card-actions :apptState="apptData.status"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "./UI/AppButton";
import ApptsContainerCardActions from "./ApptsContainerCardActions";
import ApptsContainerCardInfoStatusVue from "./ApptsContainerCardInfoStatus.vue";

export default {
  components: {
    uiButton: AppButton,
    cardActions: ApptsContainerCardActions,
    coloredTextStatus: ApptsContainerCardInfoStatusVue
  },
  props: {
    apptData: {}
  },
  computed: {
    fullName() {
      return this.apptData.firstName + " " + this.apptData.lastName;
    },
    longMonth() {
      return this.substringDate(this.apptData.appointmentStart).longApptMonth;
    },

    shortMonth() {
      return this.substringDate(this.apptData.appointmentStart).shortApptMonth;
    },
    dateDay() {
      return this.substringDate(this.apptData.appointmentStart).day;
      /*(n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '')*/
    },
    dateTime() {
      return this.substringDate(this.apptData.appointmentStart).time;
    },
    apptDuration() {
      return (
        this.duration(
          this.apptData.appointmentStart,
          this.apptData.appointmentEnd
        ) + " minutes"
      );
    }
  },
  methods: {
    substringDate(fullDate) {
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
        day: ("0" + date.getDate()).slice(-2),
        time:
          Math.abs(date.getHours() - 12) +
          ":" +
          ("0" + date.getMinutes()).slice(-2) +
          " " +
          (date.getHours() < 12 ? "AM" : "PM")
      };
      return dateObj;
    },
    duration(start, end) {
      let apptStart = new Date(start);
      let apptEnd = new Date(end);

      let x = apptStart.getHours() * 60 + apptStart.getMinutes();
      let y = apptEnd.getHours() * 60 + apptEnd.getMinutes();

      return y - x;
    }
  }
};
</script>

<style scoped lang="scss">
.single-appt {
  width: 90%;
  height: 100px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0.4, 0.3) 0 0 5px;
  margin: 20px auto;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  &__apptItem {
    display: flex;
    flex-flow: row nowrap;
    width: 72%;
    &--timeInfo {
      width: 28%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &--blockDisplay {
      display: block;
    }
    &--attendeeInfo {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
      width: 75%;
      padding-left: 5px;
      border-left: rgba(206, 206, 206, 0.363) 1px solid;
    }
    &--rowItem {
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
    }
    &--colItem {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      width: 85%;
    }
    &--itemImage {
      display: none;
    }
    &--shortDate {
      display: block;
    }
    &--longDate {
      display: none;
    }
    &--cardActions {
      width: 25%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
}

.single-appt:hover {
  box-shadow: rgba(0, 0, 0.4, 0.3) 0 0 10px;
}

@media (min-width: $tablet-mq) {
  .single-appt {
    width: 60%;
    &__apptItem {
      &--attendeeInfo {
        width: 70%;
        padding-left: 20px;
      }
      &--colItem {
        padding-left: 15px;
      }

      &--itemImage {
        display: block;
        border-radius: 50%;
      }
      &--cardActions {
        width: 30%;
      }
    }
  }
}

@media (min-width: $pc-mq) {
  .single-appt {
    &__apptItem {
      width: 75%;
      &--shortDate {
        display: none;
      }
      &--timeInfo {
        width: 25%;
      }
      &--longDate {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
      &--attendeeInfo {
        width: 50%;
      }
      &--cardActions {
        width: 20%;
      }
    }
  }
}
</style>
