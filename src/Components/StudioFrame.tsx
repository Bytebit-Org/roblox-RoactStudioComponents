import Roact from "@rbxts/roact";
import IStudioFrameProperties from "../Interfaces/IStudioFrameProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";

export class StudioFrame extends Roact.Component<IStudioFrameProperties, IStudioComponentState> {
    public static readonly defaultProps = {
        Active: true,
        AnchorPoint: new Vector2(0, 0),
        BorderSizePixel: 1,
        Position: new UDim2(0, 0, 0, 0),
        Size: new UDim2(1, 0, 1, 0),
        Visible: true,
    };

    public render(): Roact.Element {
        const theme = settings().Studio.Theme;

        return <frame
            Active={this.props.Active}
            AnchorPoint={this.props.AnchorPoint}
            BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
            BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
            BorderMode={Enum.BorderMode.Inset}
            BorderSizePixel={this.props.BorderSizePixel}
            LayoutOrder={this.props.LayoutOrder !== undefined ? this.props.LayoutOrder : 0}
            Position={this.props.Position}
            Rotation={this.props.Rotation !== undefined ? this.props.Rotation : 0}
            Size={this.props.Size}
            Visible={this.props.Visible}>
            {this.props[Roact.Children]}
        </frame>;
    }
}