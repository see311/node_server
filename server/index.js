const port = 3000;
const Koa = require('koa');
const Ctrl = require('koa-route');
const app = new Koa();
const FileManager = require('./module/file_manager.js');

// 错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        // console.log(ctx.req)
        console.log('-------------------------------------------------------------------')
        console.log(ctx.url);
        console.log(ctx.method);
        console.log('-------------------------------------------------------------------')
        console.log(e);
        ctx.body = e.Error;
    }
})

app.use(Ctrl.get('/api/item_list', async (ctx) => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = await FileManager.getItemList();
}))

app.use(Ctrl.get('/api/add_item', async (ctx) => {
    let query = ctx.query;
    let name = query.name,
        phone = query.phone,
        attend = query.attend;
    ctx.body = await FileManager.addItem(name, phone, attend);
}))

app.use(async (ctx) => {
    ctx.body = '404'
})

app.listen(port, () => {
    console.log(`server has been started at http://127.0.0.1:${port}`)
});
