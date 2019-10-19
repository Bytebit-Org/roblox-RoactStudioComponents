/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import IStudioScrollingFrameProperties from "../Interfaces/IStudioScrollingFrameProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
export declare class StudioScrollingFrame extends Roact.Component<IStudioScrollingFrameProperties, IStudioComponentState> {
    static readonly defaultProps: {
        Active: boolean;
        AnchorPoint: Vector2;
        CanvasPosition: Vector2;
        CanvasSize: UDim2;
        ElasticBehavior: Enum.ElasticBehavior.WhenScrollable;
        HorizontalScrollBarInset: Enum.ScrollBarInset.None;
        Position: UDim2;
        ScrollingDirection: Enum.ScrollingDirection.Y;
        ScrollingEnabled: boolean;
        Size: UDim2;
        VerticalScrollBarInset: Enum.ScrollBarInset.ScrollBar;
        VerticalScrollBarPosition: Enum.VerticalScrollBarPosition.Right;
        Visible: boolean;
    };
    render(): Roact.Element;
}
