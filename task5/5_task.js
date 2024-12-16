const EventEmitter = require('events');

class OrderManager extends EventEmitter {
    constructor() {
        super();
        this.orders = [];
    }
    createOrder(orderId) {
        this.orders.push(orderId);
        console.log(`Order ${orderId} has been created.`);
        this.emit('orderCreated', orderId);
    }

    shipOrder(orderId) {
        if (this.orders.includes(orderId)) {
            console.log(`Order ${orderId} has been shipped.`);
            this.emit('orderShipped', orderId);
            this.orders = this.orders.filter((id) => id !== orderId);
        } else {
            console.log(`Order id:${orderId} is incorrect`);
        }
    }
}

class NotificationService {
    notifyOrderCreated(orderId) {
        console.log(
            `Notification: Your order ${orderId} has been successfully created.`
        );
    }

    notifyOrderShipped(orderId) {
        console.log(`Notification: Your order ${orderId} is on its way.`);
    }
}

const orderManager = new OrderManager();
const notificationService = new NotificationService();

orderManager.on('orderCreated', (event) =>
    notificationService.notifyOrderCreated(event)
);
orderManager.on('orderShipped', (event) =>
    notificationService.notifyOrderShipped(event)
);

orderManager.createOrder(101);
orderManager.shipOrder(101);
