const eventListeners: { action: string; callback: Function }[] = [];

/**
 * Send an event to the plugin code
 * @param {string} action Name of the event to send to the plugin code 
 * @param data Data to send to the plugin code
 */
export const dispatchEvent = (action: string, data?: any) => {
	parent.postMessage({ pluginMessage: { action, data } }, '*');
};
/**
 * 
 * @param {string} action Name of the event to handle 
 * @param {Function} callback Function to run on event
 */
export const handleEvent = (action: string, callback: Function) => {
	eventListeners.push({ action, callback });
};
window.onmessage = event => {
	const message = event.data.pluginMessage;
	if (message) {
		for (let eventListener of eventListeners) {
			if (message.action === eventListener.action) eventListener.callback(message.data);
		}
	}
};

