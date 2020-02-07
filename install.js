chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(["schedule"], function (data) {
        if (!data.schedule) {
            chrome.storage.sync.set({ "schedule" : [
                true, // Monday
                true, // Tuesday
                true, // Wednesday
                true, // Thursday
                false, // Friday
                false, // Saturday
                false // Sunday
            ]});
        }
    });
});