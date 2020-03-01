import IStudioComponentProperties = require("./IStudioComponentProperties");
import Roact from "@rbxts/roact";

interface IStudioFrameProperties extends IStudioComponentProperties {
    [Roact.Children]?: Roact.Element[],
    // Frame wrapper
    AnchorPoint?: Vector2,
    BorderSizePixel?: number,
    Position?: UDim2,
    Size?: UDim2,
}

export = IStudioFrameProperties;