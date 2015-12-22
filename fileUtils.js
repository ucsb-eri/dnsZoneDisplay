var fs = require('fs');

module.exports = {
    fileExists: function (filePath){
        //console.log('checking to see if the file exists: '+filePath);
        try {
            return fs.statSync(filePath).isFile();
        }
        catch (err) {
            console.log(err.message);
            return false;
        }
    },
    dirExists: function (filePath){
        //console.log('checking to see if the dir exists: '+filePath);
        try {
            return fs.statSync(filePath).isDirectory();
        }
        catch (err) {
            return false;
        }
    },
    canWrite: function (path, callback) {
        fs.open(path, 'a',function (err, fd) {
            if (err) {
                if (err.code === "EISDIR") {
                    // Create a file in the directory or something...
                }
                if (err.code === "EACCESS") {
                    return callback(null, false);
                }
                return callback(err);
            }
            fs.close(fd, function (err) {
                    if (err) return callback(err);
                    callback(null, true);
            });
        });
    }
};