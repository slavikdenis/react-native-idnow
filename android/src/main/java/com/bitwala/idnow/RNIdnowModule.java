package com.bitwala.idnow;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

import de.idnow.sdk.IDnowSDK;

public class RNIdnowModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private Promise idnowPromise;

    private final ActivityEventListener idnowActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == IDnowSDK.REQUEST_ID_NOW_SDK) {
                switch (resultCode) {

                    case IDnowSDK.RESULT_CODE_SUCCESS:
                        idnowPromise.resolve(true);
                        break;

                    case IDnowSDK.RESULT_CODE_CANCEL:
                        idnowPromise.reject("CANCELLED", "Identification canceled");
                        break;

                    case IDnowSDK.RESULT_CODE_FAILED:
                        idnowPromise.reject("FAILED", "Identification failed");
                        break;

                    default:
                        idnowPromise.reject("INTERNAL_ERROR", "Internal error: " + resultCode);
                }
            }
        }
    };

    public RNIdnowModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(idnowActivityEventListener);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNIdnow";
    }

    @ReactMethod
    public void startVideoIdent(final ReadableMap options, final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        idnowPromise = promise;

        try {
            String language = options.getString("userInterfaceLanguage");
            IDnowSDK.getInstance().initialize(currentActivity, options.getString("companyId"), language);
            IDnowSDK.setShowVideoOverviewCheck(options.getBoolean("showVideoOverviewCheck"), reactContext);
            IDnowSDK.setShowErrorSuccessScreen(options.getBoolean("showErrorSuccessScreen"), reactContext);

            IDnowSDK.setTransactionToken(options.getString("transactionToken"), reactContext);

            IDnowSDK.getInstance().start(IDnowSDK.getTransactionToken(reactContext));
        } catch (Exception e) {
            promise.reject("ERR_UNEXPECTED_EXCEPTION", e);
        }
    }
}
