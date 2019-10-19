import Roact from "@rbxts/roact";
import IStudioFrameProperties from "../Interfaces/IStudioFrameProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";

const _POSITION_ADDER = new UDim2(0, 1, 0, 1);
const _SIZE_ADDER = new UDim2(0, -2, 0, -2);

export class StudioFrame extends Roact.Component<IStudioFrameProperties, IStudioComponentState> {
    public static readonly defaultProps = {
        Active: true,
        AnchorPoint: new Vector2(0, 0),
        Position: new UDim2(0, 0, 0, 0),
        Size: new UDim2(1, 0, 1, 0),
        Visible: true,
    };

    public render(): Roact.Element {
        const theme = settings().Studio.Theme;

        return <frame
            Active={this.props.Active}
            BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
            BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
            BorderSizePixel={1}
            LayoutOrder={this.props.LayoutOrder !== undefined ? this.props.LayoutOrder : 0}
            Position={this.props.Position!.add(_POSITION_ADDER)}
            Rotation={this.props.Rotation !== undefined ? this.props.Rotation : 0}
            Size={this.props.Size!.add(_SIZE_ADDER)}
            Visible={this.props.Visible}>
            {this.props[Roact.Children]}
        </frame>;
    }
}