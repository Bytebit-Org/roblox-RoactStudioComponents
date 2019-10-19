-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:48 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local StudioTextLabel;
local Roact = TS.import(TS.getModule("roact").roact.src);
local DeriveColorModifier = TS.import(script.Parent.Parent, "Common", "StudioComponentUtilities").DeriveColorModifier;
do
	StudioTextLabel = Roact.Component:extend("StudioTextLabel");
	function StudioTextLabel:init(props)
	end;
	function StudioTextLabel:render()
		local theme = settings().Studio.Theme;
		local styleGuideModifier = DeriveColorModifier(self.props, self.state);
		return Roact.createElement("TextLabel", {
			Active = self.props.Active,
			AnchorPoint = self.props.AnchorPoint,
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			Font = Enum.Font.SourceSans,
			LayoutOrder = self.props.LayoutOrder,
			Position = self.props.Position,
			Rotation = self.props.Rotation,
			Size = UDim2.new(self.props.Width, StudioTextLabel.HeightUDim),
			Text = self.props.Text,
			TextColor3 = theme:GetColor(self.props.TextColorEnum, styleGuideModifier),
			TextSize = 16,
			TextXAlignment = self.props.TextXAlignment,
			TextYAlignment = Enum.TextYAlignment.Center,
			Visible = self.props.Visible 
		});
	end;
	StudioTextLabel.HeightUDim = UDim.new(0, 22);
	StudioTextLabel.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		LayoutOrder = 0;
		Position = UDim2.new(0, 0, 0, 0);
		Rotation = 0;
		Text = "";
		TextColorEnum = Enum.StudioStyleGuideColor.MainText;
		TextXAlignment = Enum.TextXAlignment.Center;
		Width = UDim.new(1, 0);
		Visible = true;
	};
end;
exports.StudioTextLabel = StudioTextLabel;
return exports;
