/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import IStudioFrameProperties from "../Interfaces/IStudioFrameProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
export declare class StudioFrame extends Roact.Component<IStudioFrameProperties, IStudioComponentState> {
    static readonly defaultProps: {
        Active: boolean;
        AnchorPoint: Vector2;
        Position: UDim2;
        Size: UDim2;
        Visible: boolean;
    };
    render(): Roact.Element;
}
