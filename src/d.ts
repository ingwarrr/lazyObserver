export default interface ILazyObserver {
  delay: number;
  wait: number;
  threshold: number;
  className: string;
  targets: HTMLElement[]|null;
  init: Function;
  onLoad: Function;
  onError: Function;
  refreshOnEvent: Function;
  refresh: Function;
}

export interface IDebounce {
  (fn: Function, wait: number): Function
}