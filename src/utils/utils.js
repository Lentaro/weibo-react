import moment from "moment";

export const redirectJud = params => {
  const { avatar, sex } = params;
  if (!avatar || !sex) {
    return "/userinfo";
  }
  return "/home";
};

export const blogTimeLineSort = blogList => {
  const timeLine = (a, b) => {
    return b.create_time - a.create_time;
  };
  return blogList.sort(timeLine);
};

// 微博发送时间判断
export const blogTimeCount = params => {
  const time = new Date().getTime();
  const howLong = time - params;
  if (howLong <= 10000) {
    return "10秒前";
  } else if (howLong <= 60000) {
    return "1分钟前";
  } else if (howLong <= 3600000) {
    return `${Math.round(howLong / 60000)}分钟前`;
  } else if (howLong <= 86400000) {
    return `${Math.round(howLong / 3600000)}小时前`;
  } else {
    return moment(params)
      .format()
      .split("T")[0];
  }
};
