import moment from "moment";

const formatDate = (data) => {
  return new Date(data).toLocaleDateString("en-US");
};

const formatDateToPG = (date) => {
  return moment(new Date(date)).format("YYYY-MM-DDTHH:mm:ss:SSS") + "Z";
};

export { formatDate, formatDateToPG };
