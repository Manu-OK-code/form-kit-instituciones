const buildRules = (field, options = {}) => {
	const rules = {};
	const { directFieldRules = true, numericMinimum = true } = options;

	if (field.requerido) {
		rules.required = 'Este campo es requerido';
	}

	if (directFieldRules && field.minLength) {
		rules.minLength = {
			value: Number(field.minLength),
			message: `Mínimo ${field.minLength} caracteres`,
		};
	}

	if (directFieldRules && field.maxLength) {
		rules.maxLength = {
			value: Number(field.maxLength),
			message: `Máximo ${field.maxLength} caracteres`,
		};
	}

	if (directFieldRules && field.pattern) {
		rules.pattern = {
			value: new RegExp(field.pattern),
			message: 'Formato inválido',
		};
	}

	field.reglas?.forEach((regla) => {
		if (regla.tipo === 'minLength' || regla.tipo === 'maxLength') {
			const minimum = regla.tipo === 'minLength';
			const key = minimum ? 'minLength' : 'maxLength';
			const label = minimum ? 'Mínimo' : 'Máximo';
			rules[key] = {
				value: regla.valor,
				message: `${label} ${regla.valor} caracteres`,
			};
			return;
		}

		if (regla.tipo === 'min' && numericMinimum) {
			rules.min = {
				value: Number(regla.valor),
				message: regla.mensaje || `El valor mínimo es ${regla.valor}`,
			};
			return;
		}

		if (regla.tipo === 'pattern') {
			rules.pattern = {
				value: new RegExp(regla.valor),
				message: regla.mensaje || 'Formato inválido',
			};
		}
	});

	return rules;
};

export { buildRules };
