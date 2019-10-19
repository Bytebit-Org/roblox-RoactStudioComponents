/// <reference types="@rbxts/roact" />
/// <reference types="@rbxts/types" />
import IStudioComponentProperties = require("./IStudioComponentProperties");
import Roact from "@rbxts/roact";
interface IStudioFrameProperties extends IStudioComponentProperties {
    [Roact.Children]?: Roact.Element[];
    AnchorPoint?: Vector2;
    Position?: UDim2;
    Size?: UDim2;
}
export = IStudioFrameProperties;
