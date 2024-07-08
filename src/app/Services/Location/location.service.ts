import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://cors-anywhere.herokuapp.com/http://api.geonames.org/postalCodeSearchJSON';
  constructor(private http: HttpClient) { }

  getLocationByPincode(pincode: string) {
    const params = {
      postalcode: pincode,
      country: 'IN', // Adjust the country code according to your needs
      maxRows: '1',
      username: 'ctpl' // Replace with your GeoNames username
    };

    return this.http.get(this.apiUrl, { params });
  }
}
