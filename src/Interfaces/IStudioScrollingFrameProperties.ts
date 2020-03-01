import IStudioComponentProperties = require("./IStudioComponentProperties");
import Roact from "@rbxts/roact";

interface IStudioScrollingFrameProperties extends IStudioComponentProperties {
    [Roact.Children]?: Roact.Element[],
    // Scrolling frame wrapper
    AnchorPoint?: Vector2,
    BorderSizePixel?: number,
    CanvasPosition?: Vector2,
    CanvasSize?: UDim2,
    ElasticBehavior?: Enum.ElasticBehavior,
    HorizontalScrollBarInset?: Enum.ScrollBarInset,
    Position?: UDim2,
    ScrollingDirection?: Enum.ScrollingDirection,
    ScrollingEnabled?: boolean,
    Size?: UDim2,
    VerticalScrollBarInset?: Enum.ScrollBarInset,
    VerticalScrollBarPosition?: Enum.VerticalScrollBarPosition,
}

export = IStudioScrollingFrameProperties;