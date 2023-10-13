const express = require('express');
const mongoose = require('mongoose');
const modelFactory = require('./src/models/ModelFactory');
const PizzaController = require('./src/controllers/PizzaController');
const OrderRoutes = require('./src/routes/orderRoutes')
const CostumerRoutes = require('./src/routes/CustomerRoutes')
const PizzaRoutes = require('./src/routes/pizzaRoutes')
const dotenv = require('dotenv');
const cors = require('cors');
const CustomerFacade = require('./src/facades/CustomerFacade');
const OrderFacade = require('./src/facades/OrderFacade');

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config({ path: './.env' });

const dbHostConnect = process.env.DB_HOST_CONNECT;

app.use(cors());
// Conectar ao MongoDB
mongoose.connect(dbHostConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

app.use(express.json());

// Implementação dos modelos e Factory Method
modelFactory.registerModel('Order', require('./src/models/Order'));
modelFactory.registerModel('Customer', require('./src/models/Customer'));
modelFactory.registerModel('Pizza', require('./src/models/Pizza'));

// Implementação das rotas para pedidos
app.use('/api', OrderRoutes(OrderFacade));
app.use('/api', CostumerRoutes(CustomerFacade));
app.use('/api', PizzaRoutes(PizzaController));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});