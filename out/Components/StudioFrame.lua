-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:48 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local Roact = TS.import(TS.getModule("roact").roact.src);
local _POSITION_ADDER = UDim2.new(0, 1, 0, 1);
local _SIZE_ADDER = UDim2.new(0, -2, 0, -2);
local StudioFrame;
do
	StudioFrame = Roact.Component:extend("StudioFrame");
	function StudioFrame:render()
		local theme = settings().Studio.Theme;
			local _0;
			if self.props.LayoutOrder ~= nil then
				_0 = self.props.LayoutOrder;
			else
				_0 = 0;
			end;
			local _1;
			if self.props.Rotation ~= nil then
				_1 = self.props.Rotation;
			else
				_1 = 0;
			end;
		return Roact.createElement("Frame", {
			Active = self.props.Active,
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainBackground),
			BorderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.Border),
			BorderSizePixel = 1,
			LayoutOrder = _0,
			Position = (self.props.Position + (_POSITION_ADDER)),
			Rotation = _1,
			Size = (self.props.Size + (_SIZE_ADDER)),
			Visible = self.props.Visible 
		}, TS.Roact_combine(
self.props[Roact.Children]
		));
	end;
	StudioFrame.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		Position = UDim2.new(0, 0, 0, 0);
		Size = UDim2.new(1, 0, 1, 0);
		Visible = true;
	};
end;
exports.StudioFrame = StudioFrame;
return exports;
