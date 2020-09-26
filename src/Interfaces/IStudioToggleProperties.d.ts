import IStudioComponentProperties from "./IStudioComponentProperties";

interface IStudioToggleProperties extends IStudioComponentProperties {
	AnchorPoint?: Vector2;
	IsOnByDefault: boolean;
	Position?: UDim2;
	Events?: {
		Toggled?: (isOn: boolean) => void;
	};
}

export = IStudioToggleProperties;
