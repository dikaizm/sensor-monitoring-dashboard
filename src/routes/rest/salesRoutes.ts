import { Router } from 'express';
import db from '../../models';
import { AddSaleType } from '../../types/sales';
import salesValidation from '../../validations/sales';
import response, { ApiResponse } from '../../utils/response';
import { Op } from 'sequelize';

const router = Router()

router.get('/', async (req, res) => {
    const { filterMonth, filterYear } = req.query

    let result: ApiResponse;
    let sales;

    try {
        if (filterMonth && filterYear) {
            sales = await db.Sales.findAll({
                where: {
                    date: {
                        [Op.gte]: new Date(`${filterYear}-${filterMonth}-01`),
                        [Op.lt]: new Date(`${filterYear}-${filterMonth}-31`)
                    }
                }
            })
        } else {
            sales = await db.Sales.findAll({
                order: [['createdAt', 'DESC']],
                include: {
                    model: db.Product,
                    attributes: ['product_name']
                }
            })

            sales.forEach((data: any) => {
                data.dataValues.name = data.product.product_name
            })
        }

        result = response.success('Sales data fetched', sales)
    } catch (error) {
        console.error(error)
        result = response.error('Failed to fetch sales data', 500)
    }

    result.send(res)
})

router.post('/', async (req, res) => {
    const data: AddSaleType = req.body

    const error = salesValidation.addSale(data)
    if (error) return error.send(res)

    let result: ApiResponse;
    try {
        const sale = await db.Sales.create({
            product_id: 1,
            quantity: data.quantity,
            date: data.date
        })
        result = response.success('Sale added', sale, 201)
    } catch (error) {
        console.error(error)
        result = response.error('Failed to add sale', 500)
    }
    result.send(res)
})

export default router