const aws = require('aws-sdk')

class OrderItem {
    constructor(params) {
        this.name = params.name || ''
        this.type = params.type || ''
        this.qty = Number(params.qty) || 0
    }
}
class Order {
    /** @param {OrderJSON} json */
    constructor(json) {
        this.id = json.id
        this.customer = json.customer
        this.staff = json.staff
        this._createdAt = json._createdAt || Date.now()
        
        this._filledAt = json._createdAt || null
        this._expireOn = json._expireOn || (new Date().getTime() / 1000) + 10 * 60

        /** @param {OrderItem[]} items */
        this.items = Array.isArray(json.items) ?
            json.items.map(item => new OrderItem(item)) : []
    }

    addItem(name, type, qty) {
        this.items.push({ name, type, qty })
    }
}

const ordersTable = process.env.ORDERS_TABLE
const dynamo = new aws.DynamoDB.DocumentClient({ region: 'us-east-2' })

async function handler(event) {
    const eventJson = JSON.stringify(event, null, 2)
    console.log(eventJson)
    const orderId = event.pathParameters.id
    const cusotmer = event.pathParameters.customer
    const { status, _filledAt } = JSON.parse(event.body)

    let response = null

    // [ ] 3.2.3: use table on updateOrder - update an order on dynamodb table

    return {
        body: JSON.stringify(response),
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,PATCH"
        },
    }
}

module.exports = { handler }
