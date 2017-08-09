const port = 3000;
const Koa = require('koa');
const Ctrl = require('koa-route');
const koaBody = require('koa-body');
const app = new Koa();
const FileManager = require('./module/file_manager.js');

// body-parser
app.use(koaBody())

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

// api
app.use(Ctrl.get('/api/item_list', async (ctx) => {
    ctx.body = await FileManager.getItemList();
}))

app.use(Ctrl.post('/api/add_item', async (ctx) => {
    let param = ctx.request.body;
    let name = param.name,
        phone = param.phone,
        attend = param.attend;
    ctx.body = await FileManager.addItem(name, phone, attend);
}))

app.use(Ctrl.get('/api/page/:pageSize/:pageIndex', async (ctx, pageSize, pageIndex) => {
    console.dir('p:' + pageSize + ',' + pageIndex)
}))

app.use(Ctrl.post('/api/test/post', ctx => {
    console.dir(ctx.request.body);
    console.log(ctx.method)
    ctx.body = ctx.method;
}))

// no match
app.use(async (ctx) => {
    ctx.throw(404,'未找到页面')
})

app.listen(port, () => {
    console.log(`server has been started at http://127.0.0.1:${port}`)
});
