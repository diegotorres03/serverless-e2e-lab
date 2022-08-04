const aws = require('aws-sdk')


const html = function (templates, ...values) {
    let str = ''
    templates.forEach((template, index) => {
        str += template
        str = values[index] ? str + values[index] : str
    })
    return str.trim()
}

const region = process.env.AWS_REGION || 'us-east-2'
const dynamo = new aws.DynamoDB.DocumentClient({ region })
const ordersTable = process.env.ORDERS_TABLE || require('../backend.json').backend.ordersTableName

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

/**
 * @param {Order[]} orders
 * @return {string} 
 */
function toHtml(orders) {
    console.log('orders', orders)
    const string = orders.map(order => html`
        <caffe-order-history-item customer="${order.customer}" id="${order.id}">
            ${order.items.map(item => 
                html`<caffe-cart-item name="${item.name}" type="${item.type}" qty="${item.qty}" editable="false"></caffe-cart-item>`).join('\n')}    
        </caffe-order-history-item>
    `)
    console.log(string)
    return string.join('\n')
}

/**
 * @param {Order[]} orders
 * @return {string} 
 */
function toJson(orders) {
    return JSON.stringify(orders)
}

/**
 * 
 * @api {GET} /orders getOrders
 * @apiName cafe
 * @apiGroup group
 * @apiVersion  1.1.1
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
async function handler(event) {
    const eventJson = JSON.stringify(event, null, 2)
    console.log(eventJson)

    const contentType = event.headers['content-type'] || event.headers['Content-Type']
    console.log(contentType)

    let orders = [ ]
    // [ ] 3.2.1: use table on getOrders - get all orders from dynamodb

    
    const isHtml = contentType === 'text/html'
    return {
        body: isHtml ? toHtml(orders) : toJson(orders),
        statusCode: 200,
        headers: {
            "Content-Type": isHtml ? "text/html" : "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,PATCH"
        },
    }

}

module.exports = { handler }
