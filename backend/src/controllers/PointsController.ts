import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1565061828011-282424b9ab40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertesIds = await trx('collectPoints').insert(point);
        const point_id = insertesIds[0];
        const pointItens = items.map((items_id: number) => {
            return {
                items_id,
                point_id
            };
        });
    
        await trx('collectPointItems').insert(pointItens);
        await trx.commit();
    
        return res.json({
            id: point_id,
            ...point
        })
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('collectPoints').where('id', id).first();

        if (!point) {
            return res.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('collectItems')
            .join('collectPointItems', 'collectItems.id', '=', 'collectPointItems.items_id')
            .where('collectPointItems.point_id', id)
            .select('collectItems.title');

        return res.json({ point, items });
    }

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        const points = await knex('collectPoints')
            .join('collectPointItems', 'collectPoints.id', '=', 'collectPointItems.point_id')
            .whereIn('collectPointItems.items_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('collectPoints.*')

        return res.json(points)
    }
}

export default PointsController;