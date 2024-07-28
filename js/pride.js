const flags = [
	{
		id: 'pride',
		colors: ['#E04641', '#DE7E41', '#E4D56F', '#55B85F', '#2473B5', '#6F5DA5'],
		transform: 'rotate(90)'
	}, {
		id: 'trans',
		colors: ['#55CDFC', '#F7A8B8', '#FFFFFF', '#F7A8B8', '#55CDFC'],
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
		style_settings.textContent = `
			body {
				--image-background-pride-button: var(--image-background-pride-${buttonVariant});
				--image-background-pride-folder: var(--image-background-pride-${folderVariant});
				--image-background-pride-button-gradient: var(--image-background-pride-gradient-${buttonVariant});
				--image-background-pride-folder-gradient: var(--image-background-pride-gradient-${folderVariant});
		}
		`;
	});
