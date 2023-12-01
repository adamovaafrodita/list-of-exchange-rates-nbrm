import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NbrmService {

  constructor(private http: HttpClient) { }

  async getExchangeRate(
    startDate: string,
    endDate: string
  ): Promise<Promise<string> | undefined> {
    const body = `
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <soap:Body>
          <GetExchangeRate xmlns="https://www.nbrm.mk/klservice/">
            <StartDate>${startDate}</StartDate>
            <EndDate>${endDate}</EndDate>
          </GetExchangeRate>
        </soap:Body>
      </soap:Envelope>
    `;

    try {
      const axiosResponse = await Axios.post('/api/kurs.asmx', body, {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: 'https://www.nbrm.mk/klservice/GetExchangeRate',
        },
      });
      return axiosResponse.data;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
}
