export default function unigueElFilter(arr1: Array<any>, arr2: Array<any>): Array<any> {
  return arr1.filter((el) => !arr2.includes(el));
}
