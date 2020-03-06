/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import { DeriveColorModifier } from "../Common/StudioComponentUtilities";
import IStudioTextLabelProperties from "../Interfaces/IStudioTextLabelProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";

export class StudioTextLabel extends Roact.Component<IStudioTextLabelProperties, IStudioComponentState> {
	public static readonly HeightUDim = new UDim(0, 22);
	public static readonly defaultProps = {
		Active: true,
		AnchorPoint: new Vector2(0, 0),
		LayoutOrder: 0,
		Position: new UDim2(0, 0, 0, 0),
		Rotation: 0,
		Text: "",
		TextColorEnum: Enum.StudioStyleGuideColor.MainText,
		TextXAlignment: Enum.TextXAlignment.Center,
		Width: new UDim(1, 0),
		Visible: true,
	};

	public constructor(props: IStudioTextLabelProperties) {
		super(props);
	}

	public render(): Roact.Element {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioTextLabelProperties>;

		const theme = settings().Studio.Theme;
		const styleGuideModifier = DeriveColorModifier(this.props, this.state);

		return (
			<textlabel
				Active={props.Active}
				AnchorPoint={props.AnchorPoint}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSans}
				LayoutOrder={props.LayoutOrder}
				Position={props.Position}
				Rotation={props.Rotation}
				Size={new UDim2(props.Width, StudioTextLabel.HeightUDim)}
				Text={props.Text}
				TextColor3={theme.GetColor(props.TextColorEnum, styleGuideModifier)}
				TextSize={16}
				TextXAlignment={props.TextXAlignment}
				TextYAlignment={Enum.TextYAlignment.Center}
				Visible={props.Visible}
				Event={{
					InputBegan: (instance, inputObject) => {
						if (inputObject.UserInputType === Enum.UserInputType.MouseButton1) {
							if (this.props.Events !== undefined && this.props.Events.MouseButton1Down !== undefined) {
								this.props.Events.MouseButton1Down();
							}
						}
					},
				}}
			/>
		);
	}
}
