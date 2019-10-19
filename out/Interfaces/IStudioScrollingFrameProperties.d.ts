/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import IStudioComponentProperties = require("./IStudioComponentProperties");
import Roact from "@rbxts/roact";
interface IStudioScrollingFrameProperties extends IStudioComponentProperties {
    [Roact.Children]?: Roact.Element[];
    AnchorPoint?: Vector2;
    CanvasPosition?: Vector2;
    CanvasSize?: UDim2;
    ElasticBehavior?: Enum.ElasticBehavior;
    HorizontalScrollBarInset?: Enum.ScrollBarInset;
    Position?: UDim2;
    ScrollingDirection?: Enum.ScrollingDirection;
    ScrollingEnabled?: boolean;
    Size?: UDim2;
    VerticalScrollBarInset?: Enum.ScrollBarInset;
    VerticalScrollBarPosition?: Enum.VerticalScrollBarPosition;
}
export = IStudioScrollingFrameProperties;
