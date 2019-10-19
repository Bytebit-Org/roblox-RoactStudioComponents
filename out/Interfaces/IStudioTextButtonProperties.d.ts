/// <reference types="@rbxts/types" />
import IStudioComponentProperties = require("./IStudioComponentProperties");
interface IStudioTextButtonProperties extends IStudioComponentProperties {
    AnchorPoint?: Vector2;
    BackgroundColorEnum?: Enum.StudioStyleGuideColor;
    BorderColorEnum?: Enum.StudioStyleGuideColor;
    Events?: {
        MouseButton1Click?: () => void;
    };
    Position?: UDim2;
    Text: string;
    TextColorEnum?: Enum.StudioStyleGuideColor;
    Width?: UDim;
}
export = IStudioTextButtonProperties;
