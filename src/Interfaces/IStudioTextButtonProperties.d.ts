import IStudioComponentProperties from "./IStudioComponentProperties";

interface IStudioTextButtonProperties extends IStudioComponentProperties {
	AnchorPoint?: Vector2;
	BackgroundColorEnum?: Enum.StudioStyleGuideColor;
	BorderColorEnum?: Enum.StudioStyleGuideColor;
	Events?: {
		MouseButton1Click?: () => void;
	};
	ForcedTextColorStyleGuideModifier?: Enum.StudioStyleGuideModifier;
	Position?: UDim2;
	Text: string;
	TextColorEnum?: Enum.StudioStyleGuideColor;
	Width?: UDim;
}

export = IStudioTextButtonProperties;
