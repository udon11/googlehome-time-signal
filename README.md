# googlehome-time-signal

# Before setup
Setup [this](https://github.com/noelportugal/google-home-notifier) for your Raspberry Pi

# Getting started

## Edit configuration file

```
cp config/default.js.template config/default.js
```

Modify file

```
vi config/default.js

```

```
module.exports = {
    googlehomenotifier: {
        address: "192.168.1.100:8080", # Edit your Raspberry Pi Address
    }
};
```


## Start application

```
npm install
npm start
```

# If you register as a service to your Raspberry Pi

```
vi /etc/systemd/system/timesignal.service
```

```
[Unit]
Description=Google Home Time Signal
After=syslog.target network-online.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/node app.js
Restart=on-failure
RestartSec=10
KillMode=process
WorkingDirectory=<<Path that cloned this repository>>

[Install]
WantedBy=multi-user.target
```

Enable this service

```
sudo systemctl enable timesignal
sudo systemctl start timesignal
```
