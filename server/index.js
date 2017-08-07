const port = 3000;
const Koa = require('koa');
const Ctrl = require('koa-route');
const app = new Koa();
const FileManager = require('./module/file_manager.js');

app.use(Ctrl.get('/api/item_list', async (ctx) => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = await FileManager.getItemList();
}))

app.listen(port, () => {
    console.log(`server has been started at http://127.0.0.1:${port}`)
});
