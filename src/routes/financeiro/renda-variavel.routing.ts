import express from "express";

const router = express.Router();

router.post('/', (req, res) => {
    res.json(req.body);
});

router.get('/', (req, res) => {
    res.send("Öi");
});

export const routeRendaVariavel = router;