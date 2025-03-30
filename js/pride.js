(function(window) {
	const flags = [
		{
			id: 'pride',
			colors: ['#E04641', '#DE7E41', '#E4D56F', '#55B85F', '#2473B5', '#6F5DA5'],
			transform: 'rotate(90)'
		}, {
			id: 'trans',
			colors: ['#55CDFC', '#F7A8B8', '#FFFFFF', '#F7A8B8', '#55CDFC'],
			transform: 'rotate(90)'
		}, {
			id: 'pan',
			colors: ['#FE218C', '#FFD800', '#21B1FF'],
			transform: 'rotate(90)'
		}, {
			id: 'nonbinary',
			colors: ['#FCF434', '#FFFFFF', '#9C59D1', '#2C2C2C'],
			transform: 'rotate(90)'
		}, {
			id: 'bi',
			colors: ['#D60270', '#9B4F96', '#0038A8'],
			transform: 'rotate(90)'
		}, {
			id: 'asexual',
			colors: ['#000000', '#9F9F9F', '#FFFFFF', '#5E1984'],
			transform: 'rotate(90)'
		}, {
			id: 'lesbian',
			colors: ['#D52D00', '#EF7627', '#FF9A56', '#FFFFFF', '#D162A4', '#B55690', '#A30262'],
			transform: 'rotate(90)'
		}
	];

	const generateGradient = colors => {
		const steps = colors.length;
		return colors.map((color, index) => { return [
			[color, (index / steps)],
			[color, (index + 1) / steps]
		]}).flat();
	};

	const generateStops = (colors, opacity) => {
		return generateGradient(colors).map(([color, offset]) => {
			return `<stop stop-color="${color}" stop-opacity="${opacity}" offset="${offset * 100}%"></stop>`;
		});
	};

	const makeLinearGradientSvg = (id, colors, opacity, transform) => {
		return `<svg xmlns="http://www.w3.org/2000/svg" id="svg-${id}" preserveAspectRatio="none" width="100%" height="100%">
			  <defs>
			    <linearGradient id="gradient-${id}" gradientTransform="${transform}">
			      ${generateStops(colors, opacity).join('\n')}
			    </linearGradient>
			  </defs>
			  <style>
			    rect { height: 100%; width: 100%; }
			  </style>
			  <rect fill="url(#gradient-${id})" width="100%" height="100%" />
			</svg>`;
	};

	const generateCssBackgroundRules = (type, variant) => `
		--image-background-pride-${type}: var(--image-background-pride-${variant});
		--image-background-pride-${type}-gradient: var(--image-background-pride-gradient-${variant});
	`;
	const setDisabledState = (nodes, state) => nodes.forEach(node => node.disabled = !!state);
	const blockInputs = nodes => setDisabledState(nodes, true);
	const blockInputs = nodes => setDisabledState(nodes, false);

	flags.forEach(flag => {
		const svg_html = makeLinearGradientSvg(flag.id, flag.colors, flag.opacity ?? '0.8', flag.transform ?? 'rotate(0)');
		const container = document.createElement('div');
		container.classList.add('hidden-visually');
		container.ariaHidden = true;
		container.innerHTML = svg_html;
		const style_c = document.createElement('style');
		style_c.textContent = `
		body {
			--image-background-pride-${flag.id}: url('data:image/svg+xml;base64,${btoa(svg_html)}');
			--image-background-pride-gradient-${flag.id}: url("#gradient-${flag.id}");
		}
		`;
		document.body.prepend(container);
		document.head.prepend(style_c);
	});

	fetch(OC.generateUrl('/apps/pride_flags/settings'))
		.then(response => response.json())
		.then(({folderVariant, buttonVariant}) => {
			if (document.querySelector('head > style#pride_flag_settings') == null) {
				const node = document.createElement('style');
				node.id = 'pride_flag_settings';
				document.head.prepend(node);
			}
			const style_settings = document.querySelector('head > style#pride_flag_settings');
			const rules = `body {
				${(folderVariant !== 'none') ? generateCssBackgroundRules('folder', folderVariant) : ''}
				${(buttonVariant !== 'none') ? generateCssBackgroundRules('button', buttonVariant) : ''}
			}`;
			style_settings.textContent = rules;
		});
	window.pride_flags = {
		flags,
		"util" : {
			"settings": {
				blockInputs,
				unblockInputs,
				"_setDisabledState": setDisabledState,
			},
		},
	};
})(window);
