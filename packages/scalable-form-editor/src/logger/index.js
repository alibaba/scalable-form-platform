export default class Logger {
    constructor(logEvent) {
        this.logEvent = logEvent;
    }

    logPageView = () => {
        if (this.logEvent) {
            this.logEvent('pageview');
        }
    };

    logException = (category, isSerious) => {
        if (this.logEvent) {
            this.logEvent('exception', category, isSerious);
        }
    };

    logTask = (category, taskType, taskTakeTime) => {
        if (this.logEvent) {
            this.logEvent('task', category, taskType, taskTakeTime || undefined);
        }
    };

    logTime = (category, timingVariable, label, value) => {
        if (this.logEvent) {
            this.logEvent('timing', category, timingVariable, label, value);
        }
    };

    logEvent = (category, action, label, value) => {
        if (this.logEvent) {
            this.logEvent('event', category, action, label, value);
        }
    };
}
