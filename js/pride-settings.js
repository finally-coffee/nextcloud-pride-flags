

const folder_selector = document.querySelectorAll('.pride_flags_user_settings .user-settings.folder-flavour select')[0];
const button_selector = document.querySelectorAll('.pride_flags_user_settings .user-settings.button-flavour select')[0];
const submit_button = document.querySelectorAll('.pride_flags_user_settings .settings-pride-submit');

function load() {
	fetch(OC.generateUrl('/apps/pride_flags/settings'))
		.then(res => res.json())
		.then(({folderVariant, buttonVariant}) => {
			folder_selector.value = folderVariant;
			button_selector.value = buttonVariant;
		});
}

function save() {
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
	})
}
submit_button.forEach(node => node.addEventListener('click', e => save()));

load();
