import { T, always, cond, equals, pipe, prop } from 'ramda';
import { BillRecvClass } from '../src/model/dashboard.model';

const isFunc = pipe(prop('type'), equals('func'));

const isLinkInValid = pipe(prop('link'), equals(''));

export const getMoreBtnMethod = (more: BillRecvClass) => {
  return cond([
    [isFunc, (more) => () => eval(String(more.value))],
    [isLinkInValid, always(null)],
    [T, (more) => () => window.open(more.url, more.target)],
  ])(more);
};
