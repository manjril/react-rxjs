import { Observable } from 'rxjs';

const temperatureObservable = new Observable((subscriber) => {
  const id = setInterval(() => {
    subscriber.next(parseInt(100 * Math.random()));
  }, parseInt(100 + 1900 * Math.random()));
  return () => {
    clearInterval(id);
  };
});

export default temperatureObservable;
