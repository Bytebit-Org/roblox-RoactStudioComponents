/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import Roact from "@rbxts/roact";
import IStudioScrollingFrameProperties from "../Interfaces/IStudioScrollingFrameProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
declare const _default: {
    new (p: IStudioScrollingFrameProperties & RbxJsxProps): {
        render(): Roact.Element;
        props: IStudioScrollingFrameProperties & StatefulComponentProps;
        state: IStudioComponentState;
        didMount(): void;
        willUnmount(): void;
        shouldUpdate(nextProps: IStudioScrollingFrameProperties, nextState: IStudioComponentState): boolean;
        willUpdate(nextProps: IStudioScrollingFrameProperties, nextState: IStudioComponentState): void;
        didUpdate(previousProps: IStudioScrollingFrameProperties, previousState: IStudioComponentState): void;
        setState<K extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: (prevState: Readonly<IStudioComponentState>, props: IStudioScrollingFrameProperties) => Roact.ContainsKeys<IStudioComponentState, K>): void;
        setState<K_1 extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: Roact.ContainsKeys<IStudioComponentState, K_1>): void;
    };
    readonly defaultProps: {
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
    validateProps(props: {}): LuaTuple<[false, string]> | LuaTuple<[true]>;
};
export = _default;
