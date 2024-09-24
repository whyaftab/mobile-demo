import moment from "moment-timezone";

export const greetingText = () => {
  const hour = moment().tz("Europe/London").hour();

  if (hour > 16) {
    return "Good Evening";
  }

  if (hour > 11) {
    return "Good Afternoon";
  }

  return "Good Morning";
};
