import { ChartSourceType } from "../types";

export const sortByCount = (source: ChartSourceType[])=>{
    if (source.length <= 1) {
      return source;
    }
    let index = Math.floor(source.length / 2);
    let left: ChartSourceType[] = [];
    let right: ChartSourceType[] = [];
    let pivot = source.splice(index, 1)[0];
    for (let i = 0; i < source.length; i++) {
      if (source[i].count > pivot.count) {
        left.push(source[i]);
      } else {
        right.push(source[i]);
      }
    }
    const sortLeft = sortByCount(left)
    const sortRight = sortByCount(right)
    const resultArray: ChartSourceType[] = sortLeft.concat(pivot,sortRight);
    return resultArray;
  }

  export const computeProportion=(source:ChartSourceType[])=>{
    let sum = 0;
    for (let i = 0; i < source.length; i++) {
      sum += source[i].count;
    }
    for (let i = 0; i < source.length; i++) {
      const temp = source[i].count / sum;
      source[i].proportion = Math.round(temp * 10000) / 100 + "%";
    }
    return source
  }

  export const isExistInSource=(tagName: string,source:ChartSourceType[])=>{
    for (let i = 0; i < source.length; i++) {
      if (source[i].tagName === tagName) {
        return i;
      }
    }
    return -1;
  }

  