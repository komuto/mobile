package com.komutoapps;

import android.annotation.TargetApi;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.doku.sdkocov2.DirectSDK;
import com.doku.sdkocov2.interfaces.iPaymentCallback;
import com.doku.sdkocov2.model.PaymentItems;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class PaymentDokuWallet extends AppCompatActivity {
    TelephonyManager telephonyManager;
    private static String[] PERMISSION_PHONE = {android.Manifest.permission.READ_PHONE_STATE};
    int PayChanChoosed = 0;
    private static final int REQUEST_PHONE = 1;
    DirectSDK directSDK;
    String invoiceNumber;
    String jsonRespon;
    JSONObject respongetTokenSDK;
    TextView textView1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment_doku_wallet);
        textView1 = (TextView) findViewById(R.id.textView2);

        telephonyManager = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        try {
            connectSDK(1);
        } catch (Exception e) {
            textView1.setText(e.getMessage());
        }
    }

    @TargetApi(Build.VERSION_CODES.M)
    private void getPermissionFirst(int paymentChanel) {
        PayChanChoosed = paymentChanel;
        if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                android.Manifest.permission.READ_PHONE_STATE)) {

            ActivityCompat.requestPermissions(PaymentDokuWallet.this,
                    new String[]{android.Manifest.permission.READ_PHONE_STATE},
                    REQUEST_PHONE);

        } else {

            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.READ_PHONE_STATE},
                    REQUEST_PHONE);
        }

    }

    private void connectSDK(int menuPaymentChannel) {

        //set payment parameter
        invoiceNumber = String.valueOf(AppsUtil.nDigitRandomNo(10));

        directSDK = new DirectSDK();

        PaymentItems cardDetails = null;
        cardDetails = InputCard();
        directSDK.setCart_details(cardDetails);

        directSDK.setPaymentChannel(menuPaymentChannel);
        directSDK.getResponse(new iPaymentCallback() {

            @Override
            public void onSuccess(final String text) {
                Log.d("RESPONSE", text);
                try {
                    respongetTokenSDK = new JSONObject(text);

                    if (respongetTokenSDK.getString("res_response_code").equalsIgnoreCase("0000")) {
                        jsonRespon = text;
                        new RequestPayment().execute();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }

            @Override
            public void onError(final String text) {
                Log.d("onError", text);
                Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onException(Exception eSDK) {
                eSDK.printStackTrace();
            }
        }, getApplicationContext());
    }

    private PaymentItems InputCard() {

        PaymentItems paymentItems = new PaymentItems();
        paymentItems.setDataAmount(AppsUtil.generateMoneyFormat("15000"));
        paymentItems.setDataBasket("[{\"name\":\"sayur\",\"amount\":\"10000.00\",\"quantity\":\"1\",\"subtotal\":\"10000.00\"},{\"name\":\"buah\",\"amount\":\"10000.00\",\"quantity\":\"1\",\"subtotal\":\"10000.00\"}]");
        paymentItems.setDataCurrency("360");
        paymentItems.setDataWords(AppsUtil.SHA1(AppsUtil.generateMoneyFormat("15000") + "2074" + "eaM6i1JjS19J" + invoiceNumber + 360 + telephonyManager.getDeviceId()));
        paymentItems.setDataMerchantChain("NA");
        paymentItems.setDataSessionID(String.valueOf(AppsUtil.nDigitRandomNo(9)));
        paymentItems.setDataTransactionID(invoiceNumber);
        paymentItems.setDataMerchantCode("2074");
        paymentItems.setDataImei(telephonyManager.getDeviceId());
        paymentItems.setMobilePhone("08123123112");
        paymentItems.setPublicKey("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsBkd2EipFMMn3hy/rgQ3UBYs0WFPiei2RFSU0r/ClJXgyh88Eq+BpKtSCivbCjCZE7YOhcdbtYonFIi+isheNv00zqo5msQNCvhT45uYZ2Arvh8+F9xGE+y1KTS7ruYnzsDHYTBv+MHOJxs0Yn1mi3+y0KSMIBhz5iSIPzQgnLdNww0VnhwNdCwlm1EeBBE4ijWAm7IWxrFAsmMynUVCZRzZ5tTU4mb8BEDc854Pu94m1YAugw74f7JzMol7tPf5MO79moXdvDmPKVzNrEvMVFDLk+KnvI/yYe4uReQA4H2glNB+hGRPjqDXztY/6EJBHDo79cjKSBmuU5WGYReRiwIDAQAB");
        paymentItems.isProduction(false);
        return paymentItems;
    }

    private class RequestPayment extends AsyncTask<String, String, JSONObject> {

        private ProgressDialog pDialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            pDialog = new ProgressDialog(PaymentDokuWallet.this);
            pDialog.setMessage("Mohon Tunggu ...");
            pDialog.setIndeterminate(false);
            pDialog.setCancelable(false);
            pDialog.show();

        }

        @Override
        protected JSONObject doInBackground(String... args) {
            JSONObject defResp = null;

            try {
                List<NameValuePair> data = new ArrayList<NameValuePair>(3);
                data.add(new BasicNameValuePair("data", jsonRespon));

                // Getting JSON from URL
                String conResult = ApiConnection.httpsConnection(PaymentDokuWallet.this,
                        Constants.URL_CHARGING_DOKU_DAN_CC, data);
                Log.d("CHARGING PAYMENT", conResult);

                defResp = new JSONObject(conResult);

            } catch (JSONException e) {
                e.printStackTrace();
            }
            return defResp;
        }

        @Override
        protected void onPostExecute(JSONObject json) {

            pDialog.dismiss();

            if (json != null) {
                try {

                    if (json.getString("res_response_code").equalsIgnoreCase("0000") && json != null) {
                        Intent intent = new Intent(getApplicationContext(), ResultPayment.class);
                        intent.putExtra("data", json.toString());
                        startActivity(intent);
                        finish();
                        Toast.makeText(getApplicationContext(), " PAYMENT SUKSES", Toast.LENGTH_SHORT).show();
                    } else {
                        Intent intent = new Intent(getApplicationContext(), ResultPayment.class);
                        intent.putExtra("data", json.toString());
                        startActivity(intent);
                        finish();
                        Toast.makeText(getApplicationContext(), "PAYMENT ERROR", Toast.LENGTH_SHORT).show();
                    }

                } catch (JSONException e) {
                    e.printStackTrace();

                }

            }
        }
    }

}
