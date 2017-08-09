const fs = require('fs');

module.exports = {
    getItemList() {
        return new Promise((res, rej) => {
            fs.readFile('user_info.json', 'utf-8', (err, data) => {
                err ? rej(err) : res(JSON.parse(data));
            })
        })
    },
    addItem(name, phone, attend) {
        return new Promise((res, rej) => {
            fs.readFile('user_info.json', 'utf-8', (err, data) => {
                if (err) {
                    rej(err)
                } else {
                    let data_arr = JSON.parse(data);
                    let user_info = { name: name, phone: phone, attend: attend };
                    data_arr.push(user_info);
                    data_json = JSON.stringify(data_arr);
                    fs.writeFile('user_info.json', data_json, 'utf-8', (err) => {
                        err ? rej(err) : res('写入成功')
                    })
                }
            })
        })
    },
    setPagination(pageSize, pageIndex) {
        this.getItemList().then(data => {
            let startIndex = (pageIndex - 1) * pageSize;
            let endIndex = pageIndex * pageSize;
            endIndex > data.length && (endIndex = data.length);
            let curResult = data.slice(startIndex, endIndex);
            return curResult;
        }).catch(err => {
            return err;
        })
    }
}