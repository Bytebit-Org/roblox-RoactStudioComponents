import IStudioComponentProperties from "./IStudioComponentProperties";

interface IStudioToggleProperties extends IStudioComponentProperties {
	IsOnByDefault: boolean;
	Events?: {
		Toggled?: (isOn: boolean) => void;
	};
}

export = IStudioToggleProperties;
