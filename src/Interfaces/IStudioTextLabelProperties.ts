import IStudioComponentProperties from "./IStudioComponentProperties";

interface IStudioTextLabelProperties extends IStudioComponentProperties {
	AnchorPoint?: Vector2;
	Position?: UDim2;
	Text?: string;
	TextColorEnum?: Enum.StudioStyleGuideColor;
	TextXAlignment?: Enum.TextXAlignment;
	Width?: UDim;
	Events?: {
		MouseButton1Down?: () => void;
	};
}

export = IStudioTextLabelProperties;
