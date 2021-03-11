/**
 * 获取所有promise任务执行结束后的返回值
 * @param tasks promise obj
 */
export default function end(...tasks: Array<Promise<any>>): Promise<unknown>;
