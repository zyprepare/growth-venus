/**
 * 获取所有promise任务执行结束后的返回值
 * @param tasks promise obj
 */
export default function end(...tasks: Array<Promise<any>>) {
  return new Promise(resolve => {
    let result = {};
    let index = 0;
    let len = tasks.length;

    tasks.forEach(item => {
      item.then(res => {
        result = Object.assign({}, result, res);
        index++;
        if (index === len) {
          resolve(result);
        }
      }).catch(() => {
        index++;
        if (index === len) {
          resolve(result);
        }
      });
    });
  });
}
