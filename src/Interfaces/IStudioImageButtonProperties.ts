import IStudioComponentProperties = require("./IStudioComponentProperties");

interface IStudioImageButtonProperties extends IStudioComponentProperties {
    Active?: boolean,
    AnchorPoint?: Vector2,
    BackgroundColorEnum?: Enum.StudioStyleGuideColor,
    BorderColorEnum?: Enum.StudioStyleGuideColor,
    Events?: {
        MouseButton1Click?: () => void
    },
    Image: string,
    ImageColor3?: Color3,
    ImageRectOffset?: Vector2,
    ImageRectSize?: Vector2,
    Position?: UDim2,
    Width: UDim,
}

export = IStudioImageButtonProperties;