(function(window) {
	const folder_selector = document.querySelectorAll('.pride_flags_user_settings .user-settings.folder-flavour select')[0];
	const button_selector = document.querySelectorAll('.pride_flags_user_settings .user-settings.button-flavour select')[0];
	const submit_button = document.querySelectorAll('.pride_flags_user_settings .settings-pride-submit');
	const container = document.querySelector('.pride_flags_user_settings .settings-section');
	const inputs = [
		folder_selector,
		button_selector,
	];

	function load() {
		window.pride_flags.util.settings.blockInputs(inputs);
		fetch(OC.generateUrl('/apps/pride_flags/settings'))
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
		fetch(OC.generateUrl('/apps/pride_flags/settings'), {
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
			window.pride_flags.util.settings.unblockInputs(inputs);
			console.err(err);
		});
	}
	submit_button.forEach(node => node.addEventListener('click', e => save()));

	load();
})(window);
