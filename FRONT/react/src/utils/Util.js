const helpers = {
  getStringDate(date) {
    let dateSplitted = date.split("-");
    return dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0];
  }
};

export default helpers;
