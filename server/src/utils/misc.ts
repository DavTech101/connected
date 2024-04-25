//##########################################################################################
// SLEEP FUNCTION
//##########################################################################################
export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Process Time Passed');
    }, time);
  });
};
