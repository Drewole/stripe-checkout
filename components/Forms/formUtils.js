export const patterns = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const middleware = {
  phone: (value) => {
    const nums = value.split('').filter((char) => /^[0-9]*$/.test(char));

    if (nums.length < 4) {
      return nums.join('');
    }

    if (nums.length < 7) {
      return `${nums.slice(0, 3).join('')}-${nums.slice(3).join('')}`;
    }

    return `${nums.slice(0, 3).join('')}-${nums.slice(3, 6).join('')}-${nums
      .slice(6, 10)
      .join('')}`;
  },
};
