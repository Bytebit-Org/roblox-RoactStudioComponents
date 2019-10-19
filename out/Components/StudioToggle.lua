-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 8:44 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local Roact = TS.import(TS.getModule("roact").roact.src);
local _SIZE = UDim2.new(0, 27, 0, 16);
local _IMAGES = {};
local _0 = {
	[false] = "rbxasset://textures/TerrainTools/import_toggleOff_dark.png";
	[true] = "rbxasset://textures/TerrainTools/import_toggleOn_dark.png";
};
_IMAGES["Dark"] = _0;
local _1 = {
	[false] = "rbxasset://textures/TerrainTools/import_toggleOff.png";
	[true] = "rbxasset://textures/TerrainTools/import_toggleOn.png";
};
_IMAGES["Light"] = _1;
local StudioToggle;
do
	StudioToggle = Roact.Component:extend("StudioToggle");
	function StudioToggle:init(props)
		self:setState({
			IsMouseOver = false;
			IsPressed = false;
			IsSelected = false;
			IsOn = self.props.IsOnByDefault;
		});
	end;
	function StudioToggle:render()
		local theme = settings().Studio.Theme;
			local _2;
			if self.props.Active ~= nil then
				_2 = self.props.Active;
			else
				_2 = true;
			end;
			local _3;
			if self.props.LayoutOrder ~= nil then
				_3 = self.props.LayoutOrder;
			else
				_3 = 0;
			end;
			local _4;
			if self.props.Rotation ~= nil then
				_4 = self.props.Rotation;
			else
				_4 = 0;
			end;
			local _5;
			if self.props.Visible ~= nil then
				_5 = self.props.Visible;
			else
				_5 = true;
			end;
		return Roact.createElement("ImageButton", {
			Active = _2,
			AutoButtonColor = false,
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			LayoutOrder = _3,
			Image = _IMAGES[theme.Name][self.state.IsOn],
			Rotation = _4,
			Size = _SIZE,
			Visible = _5,
			[Roact.Event.MouseButton1Click] = function()
				local isOn = not self.state.IsOn;
				self:setState({
					IsOn = isOn;
				});
				if self.props.Events ~= nil and self.props.Events.Toggled ~= nil then
					self.props.Events.Toggled(isOn);
				end;
			end 
		});
	end;
end;
exports.StudioToggle = StudioToggle;
return exports;
