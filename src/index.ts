import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/product';
import userRoutes from './handlers/user';
import orderRoutes from './handlers/order';

const app = express();

const port = 3000;

app.use(bodyParser.json());

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
});

export default app;

