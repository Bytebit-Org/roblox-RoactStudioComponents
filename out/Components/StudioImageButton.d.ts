/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import Roact from "@rbxts/roact";
import IStudioImageButtonProperties from "../Interfaces/IStudioImageButtonProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
declare const _default: {
    new (props: IStudioImageButtonProperties): {
        render(): Roact.Element;
        props: IStudioImageButtonProperties & StatefulComponentProps;
        state: IStudioComponentState;
        didMount(): void;
        willUnmount(): void;
        shouldUpdate(nextProps: IStudioImageButtonProperties, nextState: IStudioComponentState): boolean;
        willUpdate(nextProps: IStudioImageButtonProperties, nextState: IStudioComponentState): void;
        didUpdate(previousProps: IStudioImageButtonProperties, previousState: IStudioComponentState): void;
        setState<K extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: (prevState: Readonly<IStudioComponentState>, props: IStudioImageButtonProperties) => Roact.ContainsKeys<IStudioComponentState, K>): void;
        setState<K_1 extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: Roact.ContainsKeys<IStudioComponentState, K_1>): void;
    };
    readonly HeightUDim: UDim;
    readonly defaultProps: {
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
    validateProps(props: {}): LuaTuple<[false, string]> | LuaTuple<[true]>;
};
export = _default;
