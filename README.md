Attempt at a simple node script to serve out DNS zone listings.

Idea is to use express and ejs to futz around with this stuff.

Will need to have some sort of config/settings to tell the server
where the files in question are located.  This will allow easier
creation of a dev environment.  Will make that a json
file of some sort.

To install, clone the git repo and then do the following:
* cp config-default.json config.json
* vi config.json   # modify the config to match the path to want to track
