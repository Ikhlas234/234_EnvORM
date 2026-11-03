const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    db.sequelize.sync({ alter: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.post('/komik', async (req, res) => {
    const data = req.body;
    if (!data.type || !data.author) {
        return res.status(400).send({ error: 'Field type dan author wajib diisi' });
    }
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (komik) {
            await komik.update(data);
            res.send(komik);
        } else {
            res.status(404).send({ error: 'Komik not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }
        await komik.destroy();
        res.send({ message: 'Komik berhasil dihapus' });
    } catch (error) {
        res.status(500).send(error);
    }
});
