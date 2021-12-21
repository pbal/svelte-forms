export function style(
	node: HTMLElement,
	{ field = null, valid = 'valid', invalid = 'invalid', dirty = 'dirty',
		iconClass = null } = {}
) {

	const dirtyElement = document.createElement('span');
	dirtyElement.classList.add('icon-dirty');
	dirtyElement.classList.add(iconClass);

	const unsubscribe = field.subscribe((field) => {
		if (field.dirty) {
			node.classList.add(dirty);
			node.parentNode.insertBefore(dirtyElement, node);
			if (field.valid) {
				node.classList.add(valid);
				node.classList.remove(invalid);
			} else {
				node.classList.add(invalid);
				node.classList.remove(valid);
			}
		} else {
			var dirtyNode = node.parentNode.querySelector('.icon-dirty');
			if (dirtyNode) {
				node.parentNode.removeChild(dirtyNode);
			}
			node.classList.remove(dirty);
		}
	});

	return {
		destroy: () => unsubscribe()
	};
}
