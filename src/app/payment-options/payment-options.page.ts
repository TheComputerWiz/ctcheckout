import {Component, OnInit} from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';


@Component({
    selector: 'app-payment-options',
    templateUrl: './payment-options.page.html',
    styleUrls: ['./payment-options.page.scss'],
})
export class PaymentOptionsPage implements OnInit {

    constructor(private http: HTTP) {
    }

    ngOnInit() {
    }

    async pay(amount) {

        var merchant = 337234001;
        var password = "xyz";
        let credentials = btoa(merchant + ":" + password);
        amount = amount.toFixed(2)

        try {
            const url = 'https://w1.mercurycert.net/PaymentsAPI/Credit/Sale';
            const params = {
                "InvoiceNo": "11000",
                "RefNo": "1",
                "Memo": "Test",
                "Purchase": amount,
                "Frequency": "OneTime",
                "TerminalName": "MPS Terminal",
                "ShiftID": "MPS Shift",
                "OperatorID": "MPS Operator",
                "AcctNo": "5413330089010681",
                "ExpDate": "1222",
                "Address": "4 Corporate Square",
                "Zip": "30329",
                "CVVData": "880",
            };

            this.http.setDataSerializer('json');


            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + credentials,
                'Access-Control-Allow-Origin': '*',

            };

            const response = await this.http.post(url, params, headers);

            console.log(response.status);
            console.log(JSON.parse(response.data)); // JSON data returned by server
            console.log(response.headers);
            alert("success")

            alert((response.data));


        } catch (error) {
            alert("error")

            alert(JSON.stringify(error));
        }




    }


}
