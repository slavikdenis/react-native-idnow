import { processColor } from 'react-native';

type Color = Parameters<typeof processColor>[0];

// ** Results
// IDnowSDK.RESULT_CODE_SUCCESS => resolve(true)

// !! Rejections
// IDnowSDK.RESULT_CODE_CANCEL => reject("CANCELLED", "Identification canceled")
// IDnowSDK.RESULT_CODE_FAILED => reject("FAILED", "Identification failed")
// default => reject("INTERNAL_ERROR", "Internal error: " + resultCode);

export type IDnowVideoIdentRejectionCode =
	| 'CANCELLED'
	| 'FAILED'
	| 'INTERNAL_ERROR';

export type IDnowVideoIdentAppearance = {
	primaryBrandColor?: Color;
	successColor?: Color;
	failureColor?: Color;
	proceedButtonBackgroundColor?: Color;
	proceedButtonTextColor?: Color;
	photoIdentRetakeButtonBackgroundColor?: Color;
	photoIdentRetakeButtonTextColor?: Color;
	defaultTextColor?: Color;
	textFieldColor?: Color;
	enableStatusBarStyleLightContent?: boolean;
	fontNameRegular?: string;
	fontNameLight?: string;
	fontNameMedium?: string;
};

export type IDnowVideoIdentOptions = {
	companyId?: string;
	showVideoOverviewCheck?: boolean;
	showErrorSuccessScreen?: boolean;
	transactionToken?: string;
	ignoreCompanyID?: boolean;
	showIdentTokenOnCheckScreen?: boolean;
	forceModalPresentation?: boolean;
	appearance?: IDnowVideoIdentAppearance;
};

export class IDnowManager {
	static startVideoIdent(options: IDnowVideoIdentOptions): Promise<true>;
}
