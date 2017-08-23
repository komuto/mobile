package com.komutoapps;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

import com.doku.sdkocov2.DirectSDK;
import com.doku.sdkocov2.interfaces.iPaymentCallback;
import com.doku.sdkocov2.model.LayoutItems;
import com.doku.sdkocov2.model.PaymentItems;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class RNIMEIModule extends ReactContextBaseJavaModule {

   ReactApplicationContext reactContext;
   TelephonyManager telephonyManager;
    int PayChanChoosed = 0;
    private static final int REQUEST_PHONE = 1;
    DirectSDK directSDK;
    String invoiceNumber;
    String jsonRespon;
    JSONObject respongetTokenSDK;
    Activity activity;
    Context context;
    
   public RNIMEIModule(ReactApplicationContext reactContext) {
       super(reactContext);
       this.reactContext = reactContext;
       context = reactContext;
       activity = getCurrentActivity();
   }

    @Override
    public String getName() {
        return "DOKU";
    }

    @ReactMethod
    public void getIMEI(Promise promise) {
        try {
            TelephonyManager tm = (TelephonyManager) this.reactContext.getSystemService(Context.TELEPHONY_SERVICE);
            promise.resolve(tm.getDeviceId());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    @ReactMethod
    public void openPaymentDokuWallet(int typePayment) {
//        Intent intent = new Intent(getCurrentActivity().getBaseContext(), PaymentDokuWallet.class);
//        getCurrentActivity().startActivity(intent);
        telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        try {
            connectSDK(typePayment);
        } catch (Exception e) {
            Toast.makeText(context, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void connectSDK(int menuPaymentChannel) {

        //set payment parameter
        invoiceNumber = String.valueOf(AppsUtil.nDigitRandomNo(10));

        LayoutItems layoutItems = new LayoutItems();
        layoutItems.setToolbarColor("#ef5656");

        directSDK = new DirectSDK();
        directSDK.setLayout(layoutItems);

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
                Toast.makeText(context, text, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onException(Exception eSDK) {
                eSDK.printStackTrace();
            }
        }, context.getApplicationContext());
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
            pDialog = new ProgressDialog(context);
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
                String conResult = ApiConnection.httpsConnection(context,
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
                        Intent intent = new Intent(context, ResultPayment.class);
                        intent.putExtra("data", json.toString());
                        activity.startActivity(intent);
                        activity.finish();
                        Toast.makeText(context, " PAYMENT SUKSES", Toast.LENGTH_SHORT).show();
                    } else {
                        Intent intent = new Intent(context, ResultPayment.class);
                        intent.putExtra("data", json.toString());
                        activity.startActivity(intent);
                        activity.finish();
                        Toast.makeText(context, "PAYMENT ERROR", Toast.LENGTH_SHORT).show();
                    }

                } catch (JSONException e) {
                    e.printStackTrace();

                }

            }
        }
    }
}