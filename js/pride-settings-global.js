(function(window) {
	const folder_selector = document.querySelectorAll('.pride_flags_server_settings .server-settings.folder-flavour select')[0];
	const button_selector = document.querySelectorAll('.pride_flags_server_settings .server-settings.button-flavour select')[0];
	const submit_button = document.querySelectorAll('.pride_flags_server_settings .settings-pride-submit');
	const container = document.querySelector('.pride_flags_server_settings .settings-section');
	const inputs = [
		folder_selector,
		button_selector,
	];

	function load() {
		window.pride_flags.util.settings.blockInputs(inputs);
		fetch(OC.generateUrl('/apps/pride_flags/settings/global'))
			.then(res => res.json())
			.then(({folderVariant, buttonVariant}) => {
				folder_selector.value = folderVariant;
				button_selector.value = buttonVariant;
				window.pride_flags.util.settings.unblockInputs(inputs);
				container.classList.remove('hidden');
			});
	}

	function save() {
		window.pride_flags.util.settings.blockInputs(inputs);
		const payload = {
			folderVariant: folder_selector.value,
			buttonVariant: button_selector.value,
		}
		fetch(OC.generateUrl('/apps/pride_flags/settings/global'), {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
				"requesttoken": OC.requestToken,
			}
		}).then(response => {
			if (response.ok) {
				window.location.reload();
			}
		}).catch(err => {
			console.err(err);
			window.pride_flags.util.settings.unblockInputs(inputs);
		});
	}
	submit_button.forEach(node => node.addEventListener('click', e => save()));

	load();
})(window);
