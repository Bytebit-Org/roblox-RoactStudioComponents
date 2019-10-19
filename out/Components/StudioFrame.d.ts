/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import Roact from "@rbxts/roact";
import IStudioFrameProperties from "../Interfaces/IStudioFrameProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
declare const _default: {
    new (p: IStudioFrameProperties & RbxJsxProps): {
        render(): Roact.Element;
        props: IStudioFrameProperties & StatefulComponentProps;
        state: IStudioComponentState;
        didMount(): void;
        willUnmount(): void;
        shouldUpdate(nextProps: IStudioFrameProperties, nextState: IStudioComponentState): boolean;
        willUpdate(nextProps: IStudioFrameProperties, nextState: IStudioComponentState): void;
        didUpdate(previousProps: IStudioFrameProperties, previousState: IStudioComponentState): void;
        setState<K extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: (prevState: Readonly<IStudioComponentState>, props: IStudioFrameProperties) => Roact.ContainsKeys<IStudioComponentState, K>): void;
        setState<K_1 extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: Roact.ContainsKeys<IStudioComponentState, K_1>): void;
    };
    readonly defaultProps: {
        Active: boolean;
        AnchorPoint: Vector2;
        Position: UDim2;
        Size: UDim2;
        Visible: boolean;
    };
    validateProps(props: {}): LuaTuple<[false, string]> | LuaTuple<[true]>;
};
export = _default;
