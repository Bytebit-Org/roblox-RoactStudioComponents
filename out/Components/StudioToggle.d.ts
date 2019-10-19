/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import Roact from "@rbxts/roact";
import IStudioToggleProperties from "../Interfaces/IStudioToggleProperties";
import IStudioToggleState from "../Interfaces/IStudioToggleState";
declare const _default: {
    new (props: IStudioToggleProperties): {
        render(): Roact.Element;
        props: IStudioToggleProperties & StatefulComponentProps;
        state: IStudioToggleState;
        didMount(): void;
        willUnmount(): void;
        shouldUpdate(nextProps: IStudioToggleProperties, nextState: IStudioToggleState): boolean;
        willUpdate(nextProps: IStudioToggleProperties, nextState: IStudioToggleState): void;
        didUpdate(previousProps: IStudioToggleProperties, previousState: IStudioToggleState): void;
        setState<K extends "IsMouseOver" | "IsSelected" | "IsPressed" | "IsOn">(state: (prevState: Readonly<IStudioToggleState>, props: IStudioToggleProperties) => Roact.ContainsKeys<IStudioToggleState, K>): void;
        setState<K_1 extends "IsMouseOver" | "IsSelected" | "IsPressed" | "IsOn">(state: Roact.ContainsKeys<IStudioToggleState, K_1>): void;
    };
    validateProps(props: {}): LuaTuple<[false, string]> | LuaTuple<[true]>;
};
export = _default;
