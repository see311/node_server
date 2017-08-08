const fs = require('fs');

module.exports = {
    getItemList() {
        return new Promise((res, rej) => {
            fs.readFile('../user_info.json', 'utf-8', (err, data) => {
                err ? rej(err) : res(data);
            })
        })
    }
}