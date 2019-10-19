/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import IStudioTextBoxProperties from "../Interfaces/IStudioTextBoxProperties";
import IStudioTextBoxState from "../Interfaces/IStudioTextBoxState";
export declare class StudioTextBox extends Roact.Component<IStudioTextBoxProperties, IStudioTextBoxState> {
    static readonly HeightUDim: UDim;
    static readonly defaultProps: IStudioTextBoxProperties;
    private _PreviousValidValue?;
    constructor(props: IStudioTextBoxProperties);
    render(): Roact.Element;
}
