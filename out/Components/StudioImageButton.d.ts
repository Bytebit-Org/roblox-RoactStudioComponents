/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import IStudioImageButtonProperties from "../Interfaces/IStudioImageButtonProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
export declare class StudioImageButton extends Roact.Component<IStudioImageButtonProperties, IStudioComponentState> {
    static readonly HeightUDim: UDim;
    static readonly defaultProps: {
        Active: boolean;
        AnchorPoint: Vector2;
        BackgroundColorEnum: Enum.StudioStyleGuideColor.Button;
        BorderColorEnum: Enum.StudioStyleGuideColor.ButtonBorder;
        ImageColor3: Color3;
        ImageRectOffset: Vector2;
        ImageRectSize: Vector2;
        Position: UDim2;
        Width: UDim;
        Visible: boolean;
    };
    constructor(props: IStudioImageButtonProperties);
    render(): Roact.Element;
}
