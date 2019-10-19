import IStudioComponentState from "Interfaces/IStudioComponentState";
import IStudioComponentProperties from "Interfaces/IStudioComponentProperties";

export function DeriveColorModifier(props: IStudioComponentProperties, state: IStudioComponentState) : Enum.StudioStyleGuideModifier {
    if (!props.Active) {
        return Enum.StudioStyleGuideModifier.Disabled;
    }

    if (state.IsPressed) {
        return Enum.StudioStyleGuideModifier.Pressed;
    }
    
    if (state.IsSelected) {
        return Enum.StudioStyleGuideModifier.Selected;
    }

    if (state.IsMouseOver) {
        return Enum.StudioStyleGuideModifier.Hover;
    }

    return Enum.StudioStyleGuideModifier.Default;
}