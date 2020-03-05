const _DEFAULT_EPSILON = 1 / 512;

export function vector2FuzzyEquals(a: Vector2, b: Vector2, epsilon?: number) {
	if (epsilon === undefined) {
		epsilon = _DEFAULT_EPSILON;
	}

	return math.abs(a.X - b.X) <= _DEFAULT_EPSILON && math.abs(a.Y - b.Y) <= _DEFAULT_EPSILON;
}
