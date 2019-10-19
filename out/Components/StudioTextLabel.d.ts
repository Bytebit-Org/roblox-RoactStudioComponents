/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import IStudioTextLabelProperties from "../Interfaces/IStudioTextLabelProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";
export declare class StudioTextLabel extends Roact.Component<IStudioTextLabelProperties, IStudioComponentState> {
    static readonly HeightUDim: UDim;
    static readonly defaultProps: IStudioTextLabelProperties;
    constructor(props: IStudioTextLabelProperties);
    render(): Roact.Element;
}
