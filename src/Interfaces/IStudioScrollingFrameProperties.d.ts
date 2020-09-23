import IStudioComponentProperties from "./IStudioComponentProperties";
import Roact from "@rbxts/roact";

interface IStudioScrollingFrameProperties extends IStudioComponentProperties {
	[Roact.Children]?: Array<Roact.Element>;
	// Scrolling frame wrapper
	AnchorPoint?: Vector2;
	BorderMode?: Enum.BorderMode;
	BorderSizePixel?: number;
	CanvasPosition?: Vector2;
	CanvasSize?: UDim2 | Roact.RoactBinding<UDim2>;
	HorizontalScrollBarInset?: Enum.ScrollBarInset;
	HorizontalScrollStepSizeInPixels?: number;
	Position?: UDim2;
	ScrollingDirection?: Enum.ScrollingDirection;
	ScrollingEnabled?: boolean;
	Size?: UDim2;
	VerticalScrollBarInset?: Enum.ScrollBarInset;
	VerticalScrollBarPosition?: Enum.VerticalScrollBarPosition;
	VerticalScrollStepSizeInPixels?: number;

	Events?: {
		CanvasViewDimensionsChanged?: (topLeftCorner: Vector2, bottomRightCorner: Vector2) => void;
	};
}

export = IStudioScrollingFrameProperties;
