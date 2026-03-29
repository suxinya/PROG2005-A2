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

// New on Day 3: DOM elements for obtaining edit/delete functionality
const editItemNameInput = document.getElementById('editItemName') as HTMLInputElement;
const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
const saveEditBtn = document.getElementById('saveEditBtn') as HTMLButtonElement;
const deleteItemNameInput = document.getElementById('deleteItemName') as HTMLInputElement;
const deleteBtn = document.getElementById('deleteBtn') as HTMLButtonElement;
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
function showFeedback(message: string, isSuccess: boolean) {
    feedback.textContent = message;
    feedback.className = 'feedback ' + (isSuccess ? 'success' : 'error');
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// Utility function 2: Verify whether the Item ID is unique
function isItemIdUnique(id: string): boolean {
    return !inventory.some(item => item.itemId === id);
}

// Tool function 3: Basic data verification
function validateInput(data: Partial<InventoryItem>): boolean {
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
// Day 3: Tool Function 4- Find Inventory Items by Product Name
function findItemByName(name: string): InventoryItem | undefined {
    // Ignore case matching to enhance user experience
    return inventory.find(item => item.itemName.toLowerCase() === name.trim().toLowerCase());
}

// Day 3: Tool Function 5- Search for Index of Inventory Items by Product Name
function findItemIndexbyName(name: string): number {
    return inventory.findIndex(item => item.itemName.toLowerCase() === name.trim().toLowerCase());
}

//Day2 New: Auxiliary function - Clear all input boxes
function clearInputFields() {
    itemIdInput.value = '';
    itemNameInput.value = '';
    categoryInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
    supplierInput.value = '';
    stockStatusInput.value = '';
    isPopularInput.value = '';
    commentInput.value = '';
    //Day 3: Clear edit/delete input box
    editItemNameInput.value = '';
    deleteItemNameInput.value = '';
}

//Day2 Enhancement: Core Function - Add Product
function addItem() {
    // 1. Obtain and format the input box value
    const newItem: InventoryItem = {
        itemId: itemIdInput.value.trim(),
        itemName: itemNameInput.value.trim(),
        category: categoryInput.value as InventoryItem['category'],
        quantity: Number(quantityInput.value),
        price: Number(priceInput.value),
        supplierName: supplierInput.value.trim(),
        stockStatus: stockStatusInput.value as InventoryItem['stockStatus'],
        isPopular: isPopularInput.value as InventoryItem['isPopular'],
        comment: commentInput.value.trim() || undefined // If the comment is empty, it will be set to undefined
    };

    // 2. Perform data verification, and only add the data after it passes the verification
    if (validateInput(newItem)) {
        inventory.push(newItem); // Add to inventory array
        renderInventoryList();   // Rerender the list and update it in real time
        clearInputFields();      // Clear the input box
        showFeedback('The product has been successfully added!', true); // success feedback
    }
}

// Day 3: Core Function - Load Product Information to be Edited
function loadEditItem() {
    const itemName = editItemNameInput.value;
    if (!itemName) {
        showFeedback('Please enter the product name to be edited!', false);
        return;
    }
    // Search for products by name
    const targetItem = findItemByName(itemName);
    if (!targetItem) {
        showFeedback('No product with that name was found!', false);
        return;
    }
    // Fill the product information into the input box, disable the ID input box
    itemIdInput.value = targetItem.itemId;
    itemIdInput.disabled = true; // Key: ID cannot be modified
    itemNameInput.value = targetItem.itemName;
    categoryInput.value = targetItem.category;
    quantityInput.value = targetItem.quantity.toString();
    priceInput.value = targetItem.price.toString();
    supplierInput.value = targetItem.supplierName;
    stockStatusInput.value = targetItem.stockStatus;
    isPopularInput.value = targetItem.isPopular;
    commentInput.value = targetItem.comment || '';
    showFeedback('The product information has been loaded. After modification, click [Save Edit]!', true);
}

// Day 3: Core function - Save edited product information
function saveEditItem() {
    const originalName = editItemNameInput.value;
    if (!originalName) {
        showFeedback('Please load the product to be edited first!', false);
        return;
    }
    const targetIndex = findItemIndexbyName(originalName);
    if (targetIndex === -1) {
        showFeedback('The product has been deleted and cannot be edited!', false);
        return;
    }
    // Obtain the modified input value, and use the original value for the ID
    const updatedItem: InventoryItem = {
        itemId: itemIdInput.value,
        itemName: itemNameInput.value.trim(),
        category: categoryInput.value as InventoryItem['category'],
        quantity: Number(quantityInput.value),
        price: Number(priceInput.value),
        supplierName: supplierInput.value.trim(),
        stockStatus: stockStatusInput.value as InventoryItem['stockStatus'],
        isPopular: isPopularInput.value as InventoryItem['isPopular'],
        comment: commentInput.value.trim() || undefined
    };
    // Verify the modified data
    if (!updatedItem.itemName || !updatedItem.category || updatedItem.quantity < 0 || updatedItem.price < 0 || !updatedItem.supplierName || !updatedItem.stockStatus || !updatedItem.isPopular) {
        showFeedback('The modified field cannot be empty, and the quantity/price must be non negative!', false);
        return;
    }
    // Update inventory array
    inventory[targetIndex] = updatedItem;
    renderInventoryList();
    clearInputFields();
    itemIdInput.disabled = false; // Enable ID input box
    showFeedback('Product editing successful!', true);
}

// Day 3: Core Function - Delete Product
function deleteItem() {
    const itemName = deleteItemNameInput.value;
    if (!itemName) {
        showFeedback('Please enter the name of the product to be deleted!', false);
        return;
    }
    const targetIndex = findItemIndexbyName(itemName);
    if (targetIndex === -1) {
        showFeedback('No product with that name was found!', false);
        return;
    }
    // Custom confirmation feedback
    feedback.innerHTML = `
        Are you sure to delete the item【${itemName}】? This operation cannot be restored!
        <div class="confirm-buttons">
            <button class="confirm-btn confirm-yes" id="confirmYes">确认删除</button>
            <button class="confirm-btn confirm-no" id="confirmNo">取消</button>
        </div>
    `;
    feedback.className = 'feedback error';

    // Binding confirmation deletion event
    document.getElementById('confirmYes')!.addEventListener('click', () => {
        inventory.splice(targetIndex, 1); // Delete items from the array
        renderInventoryList(); // re-render
        clearInputFields(); // Clear the input box
        feedback.innerHTML = '';
        showFeedback('Product deleted successfully!', true);
    });

    // Bind cancellation event
    document.getElementById('confirmNo')!.addEventListener('click', () => {
        feedback.innerHTML = '';
        showFeedback('The deletion has been canceled!', true);
    });
}


// Render inventory list
function renderInventoryList() {
    inventoryList.innerHTML = ''; // Clear the existing content to avoid redundant rendering
    // Traverse the inventory array and dynamically generate DOM
    inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        // Optimization: The price is rounded to two decimal places, and if the comment is empty, it will not be displayed
        itemDiv.innerHTML = `
            <h3>${item.itemName} <small>(ID: ${item.itemId})</small></h3>
            <p><strong>Classification:</strong>${item.category}</p>
            <p><strong>Quantity:</strong>${item.quantity} | <strong>Price:</strong>$${item.price.toFixed(2)}</p>
            <p><strong>Supplier:</strong>${item.supplierName}</p>
            <p><strong>Stock status:</strong>${item.stockStatus} | <strong>Is it popular?</strong>${item.isPopular}</p>
            ${item.comment ? `<p><strong>Note:</strong>${item.comment}</p>` : ''}
        `;
        inventoryList.appendChild(itemDiv);
    });
}

// Page initialization+event binding (Day3 edit/delete button binding)
function initPage() {
    renderInventoryList();
    // Original add button
    addBtn.addEventListener('click', addItem);
    // Day 3: Edit/Delete Button Event Binding
    editBtn.addEventListener('click', loadEditItem);
    saveEditBtn.addEventListener('click', saveEditItem);
    deleteBtn.addEventListener('click', deleteItem);
}
// Launch the application
initPage();
