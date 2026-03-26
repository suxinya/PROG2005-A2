// Author:Xinya Su
// Homework：PROG2005 A2 Part1
interface InventoryItem {
    itemId: string;       //Unique ID
    itemName: string;     //Product Name
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous'; //classification
    quantity: number;     //quantity
    price: number;        //price
    supplierName: string; //supplier
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock'; //Inventory Status
    isPopular: 'Yes' | 'No'; //whether it is popular
    comment?: string;     // Remarks (optional)
}

// Initialize the inventory array and hardcode test data
let inventory: InventoryItem[] = [
    {
        itemId: 'E001',
        itemName: 'Laptop',
        category: 'Electronics',
        quantity: 10,
        price: 999.99,
        supplierName: 'Tech Supplier Inc.',
        stockStatus: 'In Stock',
        isPopular: 'Yes',
        comment: '2024 latest model'
    },
    {
        itemId: 'F001',
        itemName: 'Office Chair',
        category: 'Furniture',
        quantity: 3,
        price: 199.99,
        supplierName: 'Furniture World',
        stockStatus: 'Low Stock',
        isPopular: 'No'
    }
];

//Get DOM elements
const feedback = document.getElementById('feedback') as HTMLDivElement;
const itemIdInput = document.getElementById('itemId') as HTMLInputElement;
const itemNameInput = document.getElementById('itemName') as HTMLInputElement;
const categoryInput = document.getElementById('category') as HTMLSelectElement;
const quantityInput = document.getElementById('quantity') as HTMLInputElement;
const priceInput = document.getElementById('price') as HTMLInputElement;
const supplierInput = document.getElementById('supplier') as HTMLInputElement;
const stockStatusInput = document.getElementById('stockStatus') as HTMLSelectElement;
const isPopularInput = document.getElementById('isPopular') as HTMLSelectElement;
const commentInput = document.getElementById('comment') as HTMLTextAreaElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const inventoryList = document.getElementById('inventoryList') as HTMLDivElement;

// Utility function 1: Display feedback information
export function showFeedback(message: string, isSuccess: boolean) {
    feedback.textContent = message;
    feedback.className = 'feedback ' + (isSuccess ? 'success' : 'error');
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// Utility function 2: Verify whether the Item ID is unique
export function isItemIdUnique(id: string): boolean {
    return !inventory.some(item => item.itemId === id);
}

// Tool function 3: Basic data verification
export function validateInput(data: Partial<InventoryItem>): boolean {
    // Check whether the required fields are empty
    if (!data.itemId || !data.itemName || !data.category || !data.quantity || !data.price || !data.supplierName || !data.stockStatus || !data.isPopular) {
        showFeedback('All fields marked with "*" are required and cannot be empty!', false);
        return false;
    }
    // Check whether the numerical field is a positive number
    if (data.quantity < 0 || data.price < 0) {
        showFeedback('The quantity and price must be non-negative!', false);
        return false;
    }
    // Check whether the ID is unique
    if (!isItemIdUnique(data.itemId as string)) {
        showFeedback('The item ID already exists and must be unique!', false);
        return false;
    }
    return true;
}

// Initialization page: Display test data
function initPage() {
    renderInventoryList();
}

// Render the inventory list to the page
function renderInventoryList() {
    inventoryList.innerHTML = ''; // Clear the original content
    inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
            <h3>${item.itemName} (ID: ${item.itemId})</h3>
            <p>Category: ${item.category}</p>
            <p>Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}</p>
            <p>Supplier: ${item.supplierName}</p>
            <p>Stock Status: ${item.stockStatus} | Popular: ${item.isPopular}</p>
            ${item.comment ? `<p>Comment: ${item.comment}</p>` : ''}
        `;
        inventoryList.appendChild(itemDiv);
    });
}

//Page initialization
initPage();

// The add button event has not been bound yet (completed on Day 2)