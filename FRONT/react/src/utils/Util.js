const helpers = {
  getStringDate(date) {
    let dateSplitted = date.split("-");
    return dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0];
  },
  validDates(begin, end) {
    let beginDate = new Date(begin);
    let endDate = new Date(end);
    let now = new Date();

    if (
      !begin ||
      !end ||
      beginDate > endDate ||
      beginDate > now ||
      endDate > now
    ) {
      return false;
    }

    return true;
  }
};

export default helpers;
