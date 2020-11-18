const saleDate = moment().endOf('month').format('DD MMMM YYYY 23:59');
var day_z = new Date(saleDate); // January, February, March, April, May, June, July, August, September, October, November, December

function timer() {
  var time_now = new Date(),
    time_delta = day_z - time_now;
  if (time_delta < 0) {
    time_delta = 0;
  }
  var time_day = Math.floor(time_delta / 86400000),
    time_ost = time_delta - Math.floor(time_delta / 86400000) * 86400000,
    time_hrs = Math.floor(time_ost / 3600000);
  time_ost = time_ost - Math.floor(time_ost / 3600000) * 3600000;
  var time_min = Math.floor(time_ost / 60000);
  time_ost = time_ost - Math.floor(time_ost / 60000) * 60000;
  var time_sec = Math.floor(time_ost / 1000);
  if (time_day < 10) {
    time_day = '0' + time_day;
  }
  if (time_hrs < 10) {
    time_hrs = '0' + time_hrs;
  }
  if (time_min < 10) {
    time_min = '0' + time_min;
  }
  if (time_sec < 10) {
    time_sec = '0' + time_sec;
  }
  $('.seconds').text(time_sec);
  $('.hours').text(time_hrs);
  $('.mins').text(time_min);
  $('.days').text(time_day);
  if (time_delta == 0) {
    clearInterval(akcia_interval);
  }
}

let akcia_interval = setInterval(timer, 1);