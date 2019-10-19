/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import { DeriveColorModifier } from "../Common/StudioComponentUtilities";
import IStudioImageButtonProperties from "../Interfaces/IStudioImageButtonProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";

export = class StudioImageButton extends Roact.Component<IStudioImageButtonProperties, IStudioComponentState> {
    public static readonly HeightUDim = new UDim(0, 22);
    public static readonly defaultProps = {
        Active: true,
        AnchorPoint: new Vector2(0, 0),
        BackgroundColorEnum: Enum.StudioStyleGuideColor.Button,
        BorderColorEnum: Enum.StudioStyleGuideColor.ButtonBorder,
        ImageColor3: new Color3(1, 1, 1),
        ImageRectOffset: new Vector2(0, 0),
        ImageRectSize: new Vector2(0, 0),
        Position: new UDim2(0, 0, 0, 0),
        Width: new UDim(1, 0),
        Visible: true,
    };

    constructor(props: IStudioImageButtonProperties) {
        super(props);
        
        this.setState({
            IsMouseOver: false,
            IsPressed: false,
            IsSelected: false
        } as IStudioComponentState);
    }

    public render(): Roact.Element {
        const theme = settings().Studio.Theme;
        const styleGuideModifier = DeriveColorModifier(this.props, this.state);

        return <textbutton
            Active={this.props.Active}
            AnchorPoint={this.props.AnchorPoint}
            AutoButtonColor={false}
            BackgroundColor3={theme.GetColor(this.props.BackgroundColorEnum!, styleGuideModifier)}
            BorderColor3={theme.GetColor(this.props.BorderColorEnum!, styleGuideModifier)}
            BorderSizePixel={1}
            LayoutOrder={this.props.LayoutOrder !== undefined ? this.props.LayoutOrder : 0}
            Position={this.props.Position}
            Rotation={this.props.Rotation !== undefined ? this.props.Rotation : 0}
            Size={new UDim2(this.props.Width, StudioImageButton.HeightUDim)}
            Text={""}
            Visible={this.props.Visible}

            // Events
            Event={{
                MouseEnter: () => {
                    this.setState({
                        IsMouseOver: true
                    } as IStudioComponentState);
                },
                MouseLeave: () => {
                    this.setState({
                        IsMouseOver: false
                    } as IStudioComponentState);
                },
                MouseButton1Down: () => {
                    this.setState({
                        IsPressed: true
                    } as IStudioComponentState);
                },
                MouseButton1Up: () => {
                    this.setState({
                        IsPressed: false
                    } as IStudioComponentState);
                },
                SelectionGained: () => {
                    this.setState({
                        IsSelected: true
                    } as IStudioComponentState);
                },
                SelectionLost: () => {
                    this.setState({
                        IsSelected: false
                    } as IStudioComponentState);
                },
                MouseButton1Click: () => {
                    if (this.props.Events === undefined || this.props.Events.MouseButton1Click === undefined) {
                        return;
                    }
                    this.props.Events.MouseButton1Click();
                }
            }}>
                <imagelabel
                    Active={false}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    BackgroundTransparency={1}
                    Image={this.props.Image}
                    ImageColor3={this.props.ImageColor3}
                    ImageRectOffset={this.props.ImageRectOffset}
                    ImageRectSize={this.props.ImageRectSize}
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    Size={new UDim2(1, -4, 1, -4)} />
            </textbutton>;
    }
}