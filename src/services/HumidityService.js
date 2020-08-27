import { Observable } from 'rxjs';

const HumidityObservable = new Observable((subscriber) => {
  const time = parseInt(100 + 1900 * Math.random());
  const id = setInterval(() => {
    subscriber.next(parseInt(100 * Math.random()));
  }, time);
  return () => {
    clearInterval(id);
  };
});

export default HumidityObservable;
