/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import Roact from "@rbxts/roact";
import IStudioTextLabelProperties from "../Interfaces/IStudioTextLabelProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
declare const _default: {
    new (props: IStudioTextLabelProperties): {
        render(): Roact.Element;
        props: IStudioTextLabelProperties & StatefulComponentProps;
        state: IStudioComponentState;
        didMount(): void;
        willUnmount(): void;
        shouldUpdate(nextProps: IStudioTextLabelProperties, nextState: IStudioComponentState): boolean;
        willUpdate(nextProps: IStudioTextLabelProperties, nextState: IStudioComponentState): void;
        didUpdate(previousProps: IStudioTextLabelProperties, previousState: IStudioComponentState): void;
        setState<K extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: (prevState: Readonly<IStudioComponentState>, props: IStudioTextLabelProperties) => Roact.ContainsKeys<IStudioComponentState, K>): void;
        setState<K_1 extends "IsMouseOver" | "IsSelected" | "IsPressed">(state: Roact.ContainsKeys<IStudioComponentState, K_1>): void;
    };
    readonly HeightUDim: UDim;
    readonly defaultProps: IStudioTextLabelProperties;
    validateProps(props: {}): LuaTuple<[false, string]> | LuaTuple<[true]>;
};
export = _default;
