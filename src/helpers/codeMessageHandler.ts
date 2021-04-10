const eventListeners: { action: String; callback: Function }[] = [];

/**
 * Send an event to the UI
 * @param {string} action Name of the event
 * @param {any} data Data to send to the UI
 */
export const dispatchEvent = (action: String, data?: any) => {
	figma.ui.postMessage({ action, data });
};
/**
 * Handle an event from the UI
 * @param {string} action Name of the event 
 * @param {Function} callback Function to run on event
 */
export const handleEvent = (action: String, callback: Function) => {
	eventListeners.push({ action, callback });
};
figma.ui.onmessage = message => {
	for (let eventListener of eventListeners) {
		if (message.action === eventListener.action) eventListener.callback(message.data);
	}
};

