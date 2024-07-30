import { Router } from "express";
import { fire } from "../../utils/firebase";
import db from "../../models";
import { Op } from "sequelize";
import response, { ApiResponse } from "../../utils/response";

const router = Router()

router.get('/refresh', async (req, res) => {
    try {
        // Count firestore
        const ultrasonicCount = await fire.getDocCount('ultrasonic', 'value')

        // Save record to database
        const todayCount = await db.Production.findOne({
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                    [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                }
            }
        });

        if (todayCount) {
            todayCount.quantity = ultrasonicCount
            await todayCount.save()
        } else {
            await db.Production.create({ product_id: 1, quantity: ultrasonicCount })
        }

        res.status(200).json({ success: true, message: "Count refreshed", data: ultrasonicCount })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Failed to refresh count" })
    }
})

router.get('/ultrasonic', async (req, res) => {
    // Get query params from request filter=today
    const { filter, filterMonth, filterYear } = req.query

    if (filterMonth && filterYear) {
        try {
            const ultrasonicData = await db.Production.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: new Date(`${filterYear}-${filterMonth}-01`),
                        [Op.lt]: new Date(`${filterYear}-${filterMonth}-31`)
                    }
                }
            })
            res.status(200).json({ success: true, message: "Production data fetched", data: ultrasonicData })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: "Failed to fetch production data" })
        }
    } else if (filter === 'today') {
        try {
            const ultrasonicData = await db.Production.findOne({
                where: {
                    createdAt: {
                        [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                        [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            })
            res.status(200).json({ success: true, message: "Production data fetched", data: ultrasonicData?.quantity || 0 })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: "Failed to fetch production data" })
        }
    } else {
        try {
            const ultrasonicData = await db.Production.findAll({
                order: [['createdAt', 'DESC']],
                include: {
                    model: db.Product,
                    attributes: ['product_name']
                }
            })

            // Insert product name into name field
            ultrasonicData.forEach((data: any) => {
                data.dataValues.name = data.product.product_name
            })

            res.status(200).json({ success: true, message: "Production data fetched", data: ultrasonicData })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Failed to fetch production data" })
        }
    }
})

router.get('/ultrasonic/:id', async (req, res) => {
    const { id } = req.params

    try {
        const ultrasonicData = await db.Production.findByPk(id)
        res.status(200).json({ success: true, message: "Production data fetched", data: ultrasonicData })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch production data" })
    }
})

router.put('/ultrasonic/:id', async (req, res) => {
    // Check role
    if (req.body.user.role === 'operator') {
        return res.status(403).json({ success: false, message: 'Unauthorized' })
    }

    const { id } = req.params
    const { quantity } = req.body

    try {
        const ultrasonicData = await db.Production.findByPk(id)
        ultrasonicData.quantity = quantity
        await ultrasonicData.save()
        res.status(200).json({ success: true, message: "Ultrasonic data updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update ultrasonic data" })
    }
})

router.get('/export', async (req, res) => {
    // Check role
    // if (req.body.user.role != 'admin' || req.body.user.role != 'marketing') {
    //     return res.status(403).json({ success: false, message: 'Unauthorized' })
    // }

    let result: ApiResponse;
    try {
        const productionData = await db.Production.findAll({
            order: [['createdAt', 'DESC']],
            include: {
                model: db.Product,
                attributes: ['product_name']
            }
        })
        const salesData = await db.Sales.findAll({
            order: [['createdAt', 'DESC']],
            include: {
                model: db.Product,
                attributes: ['product_name']
            }
        })

        // Insert product name into name field
        productionData.forEach((data: any) => {
            data.dataValues.name = data.product.product_name
        })
        salesData.forEach((data: any) => {
            data.dataValues.name = data.product.product_name
        })

        console.log(productionData)

        result = response.success('Success fetch export data', { production: productionData, sales: salesData })
    } catch (error) {
        result = response.error('Failed to fetch export data', null, 500)
    }
    result.send(res)
})

export default router