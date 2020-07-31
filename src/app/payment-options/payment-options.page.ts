import {Component, OnInit} from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {  Platform } from '@ionic/angular';


declare var cordova;
@Component({
    selector: 'app-payment-options',
    templateUrl: './payment-options.page.html',
    styleUrls: ['./payment-options.page.scss'],

})

//

export class PaymentOptionsPage implements OnInit {
    orderId: number;
    amount: string;

    constructor(private http: HTTP, public platform: Platform) {
    }

    ngOnInit() {

        this.platform.ready().then(() => {


            cordova.plugins.unimag.swiper.activate();
            cordova.plugins.unimag.swiper.enableLogs(true);
            cordova.plugins.unimag.swiper.setReaderType('shuttle');

            var connected = true;


            setTimeout(function()
            {

                if (connected) {
                    cordova.plugins.unimag.swiper.swipe(function successCallback () {
                        alert('SUCCESS: Swipe started.');
                    }, function errorCallback () {
                        alert('ERROR: Could not start swipe.');
                    });
                } else alert('ERROR: Reader is not connected.');

            },2000)


            cordova.plugins.unimag.swiper.on('connected', function () {
                connected = true;
                alert('connected');
            });

            cordova.plugins.unimag.swiper.on('disconnected', function () {
                connected = false;
                alert('disconnected');

            });

            cordova.plugins.unimag.swiper.on('swipe_success', function (e) {
                var data = JSON.parse(e.detail);
                alert('cardholder name: ' + data.first_name + ' ' + data.last_name);
                alert('card number:' + data.card_number);
                alert('expiration:' + data.expiry_month + '/' + data.expiry_year);
            });

            cordova.plugins.unimag.swiper.on('swipe_error', function () {
                alert('ERROR: Could not parse card data.');
            });

            cordova.plugins.unimag.swiper.on('timeout', function (e) {
                if (connected) {
                    alert('ERROR: Swipe timed out - ' + e.detail);
                } else {
                    console.log('ERROR: Connection timed out - ' + e.detail);
                }
            });






        });



        var urlParams = new URLSearchParams(window.location.search);

        this.amount = parseFloat(urlParams.get("amount")).toFixed(2);
        this.orderId = parseInt(urlParams.get("id"));
        alert(this.orderId);

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
