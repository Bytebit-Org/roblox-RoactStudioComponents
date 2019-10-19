import IStudioComponentProperties = require("./IStudioComponentProperties");

interface IStudioTextBoxProperties extends IStudioComponentProperties {
	AnchorPoint?: Vector2;
	ClearTextOnFocus?: boolean;
    Events?: {
        ValueChanged?: (actualInstance: TextBox, newValue: string) => void
	};
	InputValidationCallback?: (newValue: string) => boolean;
    PlaceholderText?: string;
    Position?: UDim2;
    Text?: string;
    TextXAlignment?: Enum.TextXAlignment;
    Width?: UDim;
}

export = IStudioTextBoxProperties;