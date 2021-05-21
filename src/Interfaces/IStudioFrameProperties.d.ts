import IStudioComponentProperties from "./IStudioComponentProperties";
import Roact from "@rbxts/roact";

interface IStudioFrameProperties extends IStudioComponentProperties {
	[Roact.Children]?: Array<Roact.Element>;

	// Frame wrapper
	AnchorPoint?: Vector2;
	BorderSizePixel?: number;
	ClipsDescendants?: boolean;
	Position?: UDim2;
	Size?: UDim2;
}

export = IStudioFrameProperties;
