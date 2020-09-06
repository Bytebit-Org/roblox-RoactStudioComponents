import Roact from "@rbxts/roact";
import { StudioComponentSprites } from "Data/Spritesheets";

type Props = {
	IsOpen: boolean;
	Title: string;

	Events: {
		readonly MouseButton1Click: () => void;
	};
};

export class StudioTogglableSectionHeader extends Roact.Component<Readonly<Props>> {
	public static readonly HeightOffset: 46;

	public constructor(props: Readonly<Props>) {
		super(props);
	}

	public render(): Roact.Element {
		const props = this.props;

		const theme = settings().Studio.Theme;

		return (
			<textbutton
				Key={"StudioTogglableSectionHeader"}
				BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.Titlebar)}
				BackgroundTransparency={0}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 0, StudioTogglableSectionHeader.HeightOffset)}
				Text={""}
				Event={{
					MouseEnter: () => {
						this.setState({
							IsMouseOver: true,
						});
					},
					MouseLeave: () => {
						this.setState({
							IsMouseOver: false,
						});
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
					SelectionGained: () => {
						this.setState({
							IsSelected: true,
						});
					},
					SelectionLost: () => {
						this.setState({
							IsSelected: false,
						});
					},
					MouseButton1Click: () => {
						if (props.Events !== undefined && props.Events.MouseButton1Click !== undefined) {
							props.Events.MouseButton1Click();
						}
					},
				}}
			>
				<imagelabel
					Key={"ArrowImageLabel"}
					Active={false}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={StudioComponentSprites.image}
					ImageColor3={theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
					ImageRectOffset={StudioComponentSprites.sprites.triangle10x10.offset}
					ImageRectSize={StudioComponentSprites.sprites.triangle10x10.size}
					Position={new UDim2(0, 22, 0.5, 0)}
					Rotation={props.IsOpen ? 180 : 90}
					Size={UDim2.fromOffset(16, 16)}
				/>
				<textlabel
					Key={"TitleLabel"}
					Active={false}
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.SourceSansBold}
					Position={new UDim2(0, 50, 0.5, 0)}
					Size={new UDim2(1, -70, 0, 20)}
					Text={props.Title}
					TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText)}
					TextSize={20}
				/>
			</textbutton>
		);
	}
}
