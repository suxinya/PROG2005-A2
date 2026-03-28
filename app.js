"use strict";
// Initialize the inventory array and hardcode test data
let inventory = [
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
const feedback = document.getElementById('feedback');
const itemIdInput = document.getElementById('itemId');
const itemNameInput = document.getElementById('itemName');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const supplierInput = document.getElementById('supplier');
const stockStatusInput = document.getElementById('stockStatus');
const isPopularInput = document.getElementById('isPopular');
const commentInput = document.getElementById('comment');
const addBtn = document.getElementById('addBtn');
const inventoryList = document.getElementById('inventoryList');
// Utility function 1: Display feedback information
function showFeedback(message, isSuccess) {
    feedback.textContent = message;
    feedback.className = 'feedback ' + (isSuccess ? 'success' : 'error');
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}
// Utility function 2: Verify whether the Item ID is unique
function isItemIdUnique(id) {
    return !inventory.some(item => item.itemId === id);
}
// Tool function 3: Basic data verification
function validateInput(data) {
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
    if (!isItemIdUnique(data.itemId)) {
        showFeedback('The item ID already exists and must be unique!', false);
        return false;
    }
    return true;
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
}
//Day2 Enhancement: Core Function - Add Product
function addItem() {
    // 1. Obtain and format the input box value
    const newItem = {
        itemId: itemIdInput.value.trim(),
        itemName: itemNameInput.value.trim(),
        category: categoryInput.value,
        quantity: Number(quantityInput.value),
        price: Number(priceInput.value),
        supplierName: supplierInput.value.trim(),
        stockStatus: stockStatusInput.value,
        isPopular: isPopularInput.value,
        comment: commentInput.value.trim() || undefined // If the comment is empty, it will be set to undefined
    };
    // 2. Perform data verification, and only add the data after it passes the verification
    if (validateInput(newItem)) {
        inventory.push(newItem); // Add to inventory array
        renderInventoryList(); // Rerender the list and update it in real time
        clearInputFields(); // Clear the input box
        showFeedback('The product has been successfully added!', true); // success feedback
    }
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
//Day2 New: Page initialization + Binding the add button click event
function initPage() {
    renderInventoryList(); // Initialize rendering test data
    addBtn.addEventListener('click', addItem); // Bind add button
}
// Launch the application
initPage();
