import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import runscript from './lib/runscript';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/compile', async (req, res) => {
  const { code } = req.body;
  console.log(req.body);
  const { result, logs } = runscript(code, 'vm.js');
  console.log(code);
  console.log(result, logs);
  res.json({ result, logs });
});

app.listen(3000, () => console.log('Server listening on PORT 3000'));
