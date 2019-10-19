/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import Roact from "@rbxts/roact";
import IStudioTextButtonProperties from "../Interfaces/IStudioTextButtonProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
declare const _default: {
    new (props: IStudioTextButtonProperties): {
        render(): Roact.Element;
        props: IStudioTextButtonProperties & StatefulComponentProps;
        state: IStudioComponentState;
        didMount(): void;
        willUnmount(): void;
        shouldUpdate(nextProps: IStudioTextButtonProperties, nextState: IStudioComponentState): boolean;
        willUpdate(nextProps: IStudioTextButtonProperties, nextState: IStudioComponentState): void;
        didUpdate(previousProps: IStudioTextButtonProperties, previousState: IStudioComponentState): void;
        setState<K extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: (prevState: Readonly<IStudioComponentState>, props: IStudioTextButtonProperties) => Roact.ContainsKeys<IStudioComponentState, K>): void;
        setState<K_1 extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: Roact.ContainsKeys<IStudioComponentState, K_1>): void;
    };
    readonly HeightUDim: UDim;
    readonly defaultProps: IStudioTextButtonProperties;
    validateProps(props: {}): LuaTuple<[false, string]> | LuaTuple<[true]>;
};
export = _default;
