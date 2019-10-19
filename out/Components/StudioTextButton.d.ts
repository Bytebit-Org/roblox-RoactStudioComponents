/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import IStudioTextButtonProperties from "../Interfaces/IStudioTextButtonProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
export declare class StudioTextButton extends Roact.Component<IStudioTextButtonProperties, IStudioComponentState> {
    static readonly HeightUDim: UDim;
    static readonly defaultProps: IStudioTextButtonProperties;
    constructor(props: IStudioTextButtonProperties);
    render(): Roact.Element;
}
