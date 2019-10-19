/// <reference types="@rbxts/types" />
import IStudioComponentProperties = require("./IStudioComponentProperties");
interface IStudioTextLabelProperties extends IStudioComponentProperties {
    AnchorPoint?: Vector2;
    PlaceholderText?: string;
    Position?: UDim2;
    Text?: string;
    TextColorEnum?: Enum.StudioStyleGuideColor;
    TextXAlignment?: Enum.TextXAlignment;
    Width?: UDim;
}
export = IStudioTextLabelProperties;
