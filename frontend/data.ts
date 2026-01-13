export const CATEGORIES = [
    {
        categoryId: "1",
        category: "Starters",
    },
    {
        categoryId: "2",
        category: "Main Courses",
    },
    {
        categoryId: "3",
        category: "Desserts",
    }
];

export const ITEMS = [
    {
        id: "1", name: "Golden Crunch Bites",
        description: "Jumbo scallops with cauliflower purée and truffle oil.",
        price: 15, categoryId: "1"
    },
    {
        id: "2", name: "Mediterranean Olive Medley",
        description: "A mix of green and black olives marinated in herbs and spices.",
        price: 25, categoryId: "1"
    },
    {
        id: "3", name: "Spicy Buffalo Wings",
        description: "Spicy chicken wings tossed in a tangy buffalo sauce.",
        price: 18, categoryId: "1"
    },
    {
        id: "4", name: "Fresh Garden Salad",
        description: "A mix of fresh greens, tomatoes, cucumbers, and a light vinaigrette.",
        price: 12, categoryId: "1"
    },
    {
        id: "5", name: "Herb-Roasted Chicken",
        description: "Juicy herb-roasted chicken with a crispy skin.",
        price: 28, categoryId: "2"
    },
    {
        id: "6", name: "Citrus Swirl Delights",
        description: "Grilled chicken breast with a tangy citrus glaze.",
        price: 35, categoryId: "2"
    },
    {
        id: "7", name: "Creamy Garlic Shrimp Pasta",
        description: "Creamy pasta with garlic shrimp and herbs.",
        price: 10, categoryId: "2"
    },
    {
        id: "8", name: "Grilled Salmon with Lemon Butter",
        description: "Fresh salmon grilled to perfection with a zesty lemon butter sauce.",
        price: 32, categoryId: "2"
    },
    {
        id: "9", name: "Classic Tiramisu",
        description: "Layers of coffee-soaked ladyfingers and mascarpone cream.",
        price: 30, categoryId: "3"
    },
    {
        id: "10", name: "Decadent Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey molten center.",
        price: 20, categoryId: "3"
    },
    {
        id: "11", name: "Vanilla Bean Panna Cotta",
        description: "Creamy panna cotta infused with real vanilla bean.",
        price: 22, categoryId: "3"
    },
    {
        id: "12", name: "Fruit Tart with Custard",
        description: "A crisp tart shell filled with rich custard and topped with fresh fruit.",
        price: 27, categoryId: "3"
    },
    {
        id: "13", name: "Fruit Tart with Custard",
        description: "A crisp tart shell filled with rich custard and topped with fresh fruit.",
        price: 27, categoryId: "3"
    },
];

export const ORDERS = [
    {
        orderId: "5b331ea1",
        items: [
            { name: "Golden Crunch Bites", quantity: 2, price: 15.00 },
            { name: "Herb-Roasted Chicken", quantity: 1, price: 28.00 },
        ],
        totalAmount: 58,
        status: "Completed",
        orderDate: "2023-10-01",
        address: "House-23, Road-23, Jamaica, USA",
    },
    {
        orderId: "1002",
        items: [
            { name: "Spicy Buffalo Wings", quantity: 1, price: 18.00 },
            { name: "Creamy Garlic Shrimp Pasta", quantity: 2, price: 10.00 },
        ],
        totalAmount: 38,
        status: "Preparing",
        orderDate: "2023-10-05",
        address: "House-23, Road-23, Jamaica, USA",
    },
    {
        orderId: "1003",
        items: [
            { name: "Mediterranean Olive Medley", quantity: 1, price: 25.00 },
            { name: "Citrus Swirl Delights", quantity: 1, price: 35.00 },
        ],
        totalAmount: 60,
        status: "Preparing",
        orderDate: "2023-10-10",
        address: "House-23, Road-23, Jamaica, USA",
    },
];