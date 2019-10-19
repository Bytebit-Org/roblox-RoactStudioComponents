/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import IStudioToggleProperties from "../Interfaces/IStudioToggleProperties";
import IStudioToggleState from "../Interfaces/IStudioToggleState";
export declare class StudioToggle extends Roact.Component<IStudioToggleProperties, IStudioToggleState> {
    constructor(props: IStudioToggleProperties);
    render(): Roact.Element;
}
