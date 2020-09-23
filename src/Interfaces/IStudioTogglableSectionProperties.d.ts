import IStudioComponentProperties from "./IStudioComponentProperties";
import Roact from "@rbxts/roact";

export interface IStudioTogglableSectionProperties extends IStudioComponentProperties {
	StartOpen: boolean;
	Title: string;

	Events?: {
		readonly OnToggled?: (isOpen: boolean) => void;
	};

	// Children
	[Roact.Children]?: Array<Roact.Element>;

	// Frame wrapper
	AnchorPoint?: Vector2;
	BorderSizePixel?: number;
	ContentHeight?: UDim;
	Position?: UDim2;
	Width?: UDim;
}
