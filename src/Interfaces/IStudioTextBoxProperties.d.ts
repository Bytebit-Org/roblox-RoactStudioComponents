import IStudioComponentProperties from "./IStudioComponentProperties";

interface IStudioTextBoxProperties extends IStudioComponentProperties {
	AnchorPoint?: Vector2;
	ClearTextOnFocus?: boolean;
	Events?: {
		FocusLost?: (actualInstance: TextBox, enterPressed: boolean, inputThatCausedFocusLoss: Instance) => void;
		ValueChanged?: (actualInstance: TextBox, newValue: string) => void;
	};
	InputValidationCallback?: (newValue: string) => boolean;
	PlaceholderText?: string;
	Position?: UDim2;
	ShouldCaptureFocus?: boolean;
	Text?: string;
	TextXAlignment?: Enum.TextXAlignment;
	Width?: UDim;
}

export = IStudioTextBoxProperties;
