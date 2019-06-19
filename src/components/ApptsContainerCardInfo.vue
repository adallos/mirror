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
import AppButton from "./UI/BaseButton";
import ApptsContainerCardActions from "./ApptsContainerCardActions";
import ColoredStatus from "./UI/ColoredStatus";
import dateMixin from "./../mixins/dateManagement.js";

export default {
  mixins: [dateMixin],
  components: {
    uiButton: AppButton,
    cardActions: ApptsContainerCardActions,
    coloredTextStatus: ColoredStatus
  },
  props: {
    apptData: {}
  },
  computed: {
    fullName() {
      return this.apptData.firstName + " " + this.apptData.lastName;
    },
    longMonth() {
      return this.mixinSubstringDate(this.apptData.appointmentStart).longApptMonth;
    },
    shortMonth() {
      return this.getDateObj(this.apptData.appointmentStart).shortApptMonth;
    },
    dateDay() {
      return this.getDateObj(this.apptData.appointmentStart).day;
    },
    dateTime() {
      return this.getDateObj(this.apptData.appointmentStart).time;
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
    getDateObj(apptStart) {
      return this.mixinSubstringDate(apptStart);
    },
    duration(apptStart, apptEnd) {
      return this.durationMixin(apptStart, apptEnd);
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
    width: 68%;
    &--timeInfo {
      width: 32%;
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
