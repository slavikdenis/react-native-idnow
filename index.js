import { NativeModules, processColor, Platform } from 'react-native';

export const defaultOptions = {
  companyId: '',
  showVideoOverviewCheck: true,
  showErrorSuccessScreen: false,
  transactionToken: 'TST-XXXXX',
  ignoreCompanyID: true,
  showIdentTokenOnCheckScreen: false,
  forceModalPresentation: false,
  userInterfaceLanguage: 'en',

  appearance: {
    // Adjust colors
    primaryBrandColor: '#1D4477', // primaryBlue
    successColor: '#1ABC9C', // successGreen
    failureColor: '#EE4555', // warningRed
    proceedButtonBackgroundColor: '#1D4477', // primaryBlue
    proceedButtonTextColor: '#FFFFFF', // whitestWhite
    photoIdentRetakeButtonBackgroundColor: '#1D4477', // primaryBlue
    photoIdentRetakeButtonTextColor: '#FFFFFF', // whitestWhite
    // defaultTextColor: '#000',
    // textFieldColor: 'grey',

    // Adjust statusbar
    enableStatusBarStyleLightContent: false,

    // Adjust fonts
    fontNameRegular: 'HelveticaNeue',
    fontNameLight: 'HelveticaNeue-Ligth',
    fontNameMedium: 'HelveticaNeue-Bold',
  },
};

const prepareOptions = options => {
  const appearanceOptions = {
    ...defaultOptions.appearance,
    ...options.appearance,
  };

  return {
    ...defaultOptions,
    ...options,
    appearance: {
      ...appearanceOptions,
      defaultTextColor: processColor(appearanceOptions.defaultTextColor),
      primaryBrandColor: processColor(appearanceOptions.primaryBrandColor),
      proceedButtonBackgroundColor: processColor(
        appearanceOptions.proceedButtonBackgroundColor
      ),
      proceedButtonTextColor: processColor(
        appearanceOptions.proceedButtonTextColor
      ),
      photoIdentRetakeButtonBackgroundColor: processColor(
        appearanceOptions.photoIdentRetakeButtonBackgroundColor
      ),
      photoIdentRetakeButtonTextColor: processColor(
        appearanceOptions.photoIdentRetakeButtonTextColor
      ),
      textFieldColor: processColor(appearanceOptions.textFieldColor),
      failureColor: processColor(appearanceOptions.failureColor),
      successColor: processColor(appearanceOptions.successColor),
    },
  };
};

const IDnowManager = {
  startVideoIdent(options) {
    if (Platform.OS === 'ios') {
      return new Promise((resolve, reject) => {
        NativeModules.IDnowViewManager.startVideoIdent(
          prepareOptions(options),
          (...args) => {
            const err = args[0];
            const resp = args[1];
            if (resp && resp.success) {
              return resolve(resp);
            }
            return reject(err || new Error('Internal error'));
          }
        );
      });
    } else if (Platform.OS === 'android') {
      return NativeModules.RNIdnow.startVideoIdent(prepareOptions(options));
    }
  },
};

export { IDnowManager };
