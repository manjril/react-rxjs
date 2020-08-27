import { Observable } from 'rxjs';
import TemperatureService from './TemperatureService';
import AirService from './AirService';
import HumidityService from './HumidityService';

class DashboardService {
  constructor() {
    const currentTime = new Date().getTime();
    this.displayedTime = currentTime;
    this.status = false;
    this.temperature = '';
    this.temperatureDisplayed = currentTime;
    this.airPressure = '';
    this.airPressureDisplayed = currentTime;
    this.humidity = '';
    this.humidityDisplayed = currentTime;

    this.initService();
  }

  initService = () => {
    TemperatureService.subscribe((data) => this.saveValue('temperature', data));
    AirService.subscribe((data) => this.saveValue('airPressure', data));
    HumidityService.subscribe((data) => this.saveValue('humidity', data));
  };

  unsubscribe = () => {
    if (TemperatureService.unsubscribe) {
      TemperatureService.unsubscribe();
    }
    if (AirService.unsubscribe) {
      AirService.unsubscribe();
    }
    if (HumidityService.unsubscribe) {
      HumidityService.unsubscribe();
    }
  };

  saveValue = (attr, value) => {
    const currentTime = new Date().getTime();
    this[attr] = value;
    this[`${attr}Displayed`] = currentTime;
    setTimeout(() => {
      this.displayNA(attr);
    }, 1000);

    if (currentTime - this.displayedTime > 100 || this.status === false) {
      if (this.subscriber) {
        this.subscriber.next({
          temperature: this.temperature,
          airPressure: this.airPressure,
          humidity: this.humidity,
        });
      }

      this.status = true;
    }

    this.displayedTime = currentTime;
  };

  displayNA = (attr) => {
    const currentTime = new Date().getTime();
    const oldTime = this[`${attr}Displayed`];
    if (currentTime - oldTime > 1000) {
      this[attr] = 'N/A';
    }
  };

  emitOut = () => {
    return new Observable((subscriber) => {
      this.subscriber = subscriber;
    });
  };
}

export default DashboardService;
