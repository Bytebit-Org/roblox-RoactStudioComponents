/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import Roact from "@rbxts/roact";
import IStudioTextBoxProperties from "../Interfaces/IStudioTextBoxProperties";
import IStudioTextBoxState from "../Interfaces/IStudioTextBoxState";
declare const _default: {
    new (props: IStudioTextBoxProperties): {
        _PreviousValidValue?: string | undefined;
        render(): Roact.Element;
        props: IStudioTextBoxProperties & StatefulComponentProps;
        state: IStudioTextBoxState;
        didMount(): void;
        willUnmount(): void;
        shouldUpdate(nextProps: IStudioTextBoxProperties, nextState: IStudioTextBoxState): boolean;
        willUpdate(nextProps: IStudioTextBoxProperties, nextState: IStudioTextBoxState): void;
        didUpdate(previousProps: IStudioTextBoxProperties, previousState: IStudioTextBoxState): void;
        setState<K extends "IsMouseOver" | "IsSelected" | "IsPressed" | "CurrentText">(state: (prevState: Readonly<IStudioTextBoxState>, props: IStudioTextBoxProperties) => Roact.ContainsKeys<IStudioTextBoxState, K>): void;
        setState<K_1 extends "IsMouseOver" | "IsSelected" | "IsPressed" | "CurrentText">(state: Roact.ContainsKeys<IStudioTextBoxState, K_1>): void;
    };
    readonly HeightUDim: UDim;
    readonly defaultProps: IStudioTextBoxProperties;
    validateProps(props: {}): LuaTuple<[false, string]> | LuaTuple<[true]>;
};
export = _default;
