
const html = function (templates, ...values) {
    const template = document.createElement('template')
    let str = ''
    templates.forEach((template, index) => {
        str += template
        str = values[index] ? str + values[index] : str
    })
    template.innerHTML = str
    return template.content.firstChild
}


run()

const loadApiSettings = async () => {
    const settings = await fetch('/api.json').then(res => res.json())
    console.log('settings', settings)
    return settings.api
}

function run() {
    const { apiUrl } = await loadApiSettings()

    const menu = document.querySelector('caffe-menu')
    const cart = document.querySelector('caffe-cart')
    const history = document.querySelector('caffe-order-history')

    async function getOrders() {
        const url = apiUrl + 'orders'

        let orders = []
        // [ ] 2.3.1: get orders from api
        return orders
    }

    async function saveOrder(order) {
        const url = apiUrl + 'orders'

        // [ ] 2.3.2: send the order to the api

    }

    refreshOrders()

    async function refreshOrders() {
        const orders = await getOrders()
        history.clear()
        orders.forEach(order => {
            history.addItem(order)
        })
    }


    cart.addEventListener('onplaceorder', async event => {
        console.log(event)
        console.log('fetch here')
        console.log(event.detail)

        const items = event.detail
        const order = {
            id: Date.now().toString(),
            customer: 'guest',
            items: items,
        }
        await saveOrder(order)

        cart.clear()
        refreshOrders()

    })

    menu.addEventListener('item-added', event => {
        console.log('item-added', event)
        cart.addItem(event.detail)
    })

}

