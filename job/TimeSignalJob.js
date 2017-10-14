const request = require("superagent");
const config = require("config");
const moment = require("moment");
const cron = require('cron').CronJob;

class TimeSignalJob {
    static createJob() {
        return new TimeSignalJob();
    }

    constructor() {
        const timeSignal = new cron({
            cronTime: '*/10 * * * * *',
            start: false,
            timeZone: 'Asia/Tokyo',
            onTick: () => {
                this.execTimeSignal();
            }
        });

        timeSignal.start();
    }

    execTimeSignal() {
        request.post('http://' + config['googlehomenotifier']['address'] + '/google-home-notifier')
            .type('form')
            .send({
                text: moment().hours() + '時です'
            })
            .end((err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(res.text);
                }
            })
    }
}

module.exports = TimeSignalJob;
