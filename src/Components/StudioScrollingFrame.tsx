/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioScrollingFrameProperties from "../Interfaces/IStudioScrollingFrameProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";

const _POSITION_ADDER = new UDim2(0, 1, 0, 1);
const _SIZE_ADDER = new UDim2(0, -2, 0, -2);
const _SCROLLBAR_THICKNESS = 16;

export = class StudioScrollingFrame extends Roact.Component<IStudioScrollingFrameProperties, IStudioComponentState> {
    public static readonly defaultProps = {
        Active: true,
        AnchorPoint: new Vector2(0, 0),
        CanvasPosition: new Vector2(0, 0),
        CanvasSize: new UDim2(1, 0, 2, 0),
        ElasticBehavior: Enum.ElasticBehavior.WhenScrollable,
        HorizontalScrollBarInset: Enum.ScrollBarInset.None,
        Position: new UDim2(0, 0, 0, 0),
        ScrollingDirection: Enum.ScrollingDirection.Y,
        ScrollingEnabled: true,
        Size: new UDim2(1, 0, 1, 0),
        VerticalScrollBarInset: Enum.ScrollBarInset.ScrollBar,
        VerticalScrollBarPosition: Enum.VerticalScrollBarPosition.Right,
        Visible: true,
    };

    public render(): Roact.Element {
        const theme = settings().Studio.Theme;

        let canvasSize = this.props.CanvasSize!;
        if (this.props.ScrollingDirection === Enum.ScrollingDirection.Y) {
            canvasSize = canvasSize.add(new UDim2(0, -_SCROLLBAR_THICKNESS - 4, 0, 0));
        }
        else if (this.props.ScrollingDirection === Enum.ScrollingDirection.X) {
            canvasSize = canvasSize.add(new UDim2(0, 0, 0, -_SCROLLBAR_THICKNESS - 4));
        }
        else {
            canvasSize = canvasSize.add(new UDim2(0, _SCROLLBAR_THICKNESS, 0, _SCROLLBAR_THICKNESS));
        }

        return <scrollingframe
            Active={this.props.Active}
            BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBarBackground)}
            BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
            BorderSizePixel={1}
            LayoutOrder={this.props.LayoutOrder !== undefined ? this.props.LayoutOrder : 0}
            Position={this.props.Position!.add(_POSITION_ADDER)}
            Rotation={this.props.Rotation !== undefined ? this.props.Rotation : 0}
            Size={this.props.Size!.add(_SIZE_ADDER)}
            Visible={this.props.Visible}
            
            // Scrolling
            BottomImage={"rbxasset://textures/AnimationEditor/image_scrollbar_vertical_bot.png"}
            CanvasPosition={this.props.CanvasPosition}
            CanvasSize={canvasSize}
            ElasticBehavior={this.props.ElasticBehavior}
            HorizontalScrollBarInset={this.props.HorizontalScrollBarInset}
            MidImage={"rbxasset://textures/AnimationEditor/image_scrollbar_vertical_mid.png"}
            ScrollBarImageColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
            ScrollBarThickness={_SCROLLBAR_THICKNESS}
            ScrollingDirection={this.props.ScrollingDirection}
            ScrollingEnabled={this.props.ScrollingEnabled}
            TopImage={"rbxasset://textures/AnimationEditor/image_scrollbar_vertical_top.png"}
            VerticalScrollBarInset={this.props.VerticalScrollBarInset}
            VerticalScrollBarPosition={this.props.VerticalScrollBarPosition}>
            <frame
                Key={"ViewportFrame"}
                BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
                BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
                BorderSizePixel={1}
                Size={new UDim2(1, 0, 1, 0)}>
                {this.props[Roact.Children]}
            </frame>
        </scrollingframe>;
    }
}