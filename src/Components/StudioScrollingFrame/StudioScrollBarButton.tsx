import Roact from "@rbxts/roact";
import { Constants } from "Data/Constants";
import { StudioComponentSprites } from "Data/Spritesheets";

interface IStudioScrollBarButtonProperties {
	AnchorPoint: Vector2;
	Position: UDim2;
	Rotation: number;

	OnActivated: () => void;
}

interface IStudioScrollBarButtonState {
	IsPressed: boolean;
}

export class StudioScrollBarButton extends Roact.Component<
	IStudioScrollBarButtonProperties,
	IStudioScrollBarButtonState
> {
	public constructor(props: IStudioScrollBarButtonProperties) {
		super(props);

		this.setState({
			IsPressed: false,
		});
	}

	public render(): Roact.Element {
		const theme = settings().Studio.Theme;

		const styleGuideModifier = this.state.IsPressed
			? Enum.StudioStyleGuideModifier.Pressed
			: Enum.StudioStyleGuideModifier.Default;

		return (
			<imagebutton
				AnchorPoint={this.props.AnchorPoint}
				AutoButtonColor={false}
				BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar, styleGuideModifier)}
				BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border, styleGuideModifier)}
				BorderMode={Enum.BorderMode.Inset}
				BorderSizePixel={1}
				ImageTransparency={1}
				Position={this.props.Position}
				Size={new UDim2(0, Constants.ScrollBar.ThicknessInPixels, 0, Constants.ScrollBar.ThicknessInPixels)}
				Event={{
					MouseButton1Click: () => {
						if (this.props.OnActivated === undefined) {
							return;
						}
						this.props.OnActivated();
					},
					MouseButton1Down: () => {
						this.setState({
							IsPressed: true,
						});
					},
					MouseButton1Up: () => {
						this.setState({
							IsPressed: false,
						});
					},
				}}
			>
				<imagelabel
					Key={`ArrowImage`}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={StudioComponentSprites.image}
					ImageColor3={theme.GetColor(Enum.StudioStyleGuideColor.ButtonText, styleGuideModifier)}
					ImageRectOffset={StudioComponentSprites.sprites.triangle10x10.offset}
					ImageRectSize={StudioComponentSprites.sprites.triangle10x10.size}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Rotation={this.props.Rotation}
					Size={Constants.ScrollBar.ButtonSize}
				/>
			</imagebutton>
		);
	}
}
