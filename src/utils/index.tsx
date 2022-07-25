import { ItemStateIcon } from "../types";

/**
 * 
 * @param {number} start 
 * @returns {number[]} years
 */
export const generateArrayOfYears = (start: number): number[] => {
  const max: number = new Date().getFullYear();
  const min: number = max - (max - start);
  let years: number[] = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

/**
 * @returns {number[]} months
 */
export const months = (): number[] => {
  let months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  return months;
}

export const days = () => {
  let days: number[] = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
}

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
}

/**
 * @param {string} str 
 * @param {number} n 
 * @returns {string}
 */
export const truncate = (str: string, n: number): string => {
  return str?.length > n ? str.substring(0, n - 1) + '...' : str;
}

export const stateIcons: {[key: string]: ItemStateIcon} = {
  'pre-order': 'BiHourglass',
  sealed: 'BiPackage',
  built: 'BiLandscape',
  boxed: 'BiBox',
  opened: 'BiEnvelopeOpen',
  sold: 'BiDollar',
};