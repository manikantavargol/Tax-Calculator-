document.getElementById('taxForm').addEventListener('input', function(event) {
    const inputField = event.target;
    const errorIcon = inputField.nextElementSibling;
    
    // Check if the field is numeric and not empty
    if (inputField.value.trim() === '' || isNaN(inputField.value.replace(/,/g, ''))) {
        // Display error icon with appropriate message
        errorIcon.style.display = 'inline';
        errorIcon.title = "Please enter a valid number";
    } else {
        // Hide error icon when input is valid
        errorIcon.style.display = 'none';
    }
});

function calculateTax() {
    let grossIncome = parseFloat(document.getElementById('grossIncome').value.replace(/,/g, ''));
    let extraIncome = parseFloat(document.getElementById('extraIncome').value.replace(/,/g, ''));
    let deductions = parseFloat(document.getElementById('deductions').value.replace(/,/g, ''));
    let ageGroup = document.getElementById('age').value;

    // Validate inputs before processing calculations
    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions) || !ageGroup) {
        alert('Please fill out all fields correctly.');
        return;
    }

    let totalIncome = grossIncome + extraIncome - deductions;
    let taxableIncome = Math.max(totalIncome - 800000, 0);
    let tax = 0;

    switch (ageGroup) {
        case 'under40':
            tax = taxableIncome * 0.30;
            break;
        case 'between40and60':
            tax = taxableIncome * 0.40;
            break;
        case '60plus':
            tax = taxableIncome * 0.10;
            break;
    }

    let incomeAfterTax = totalIncome - tax;

    document.getElementById('resultText').textContent = `As per Your income the tax is ₹${tax.toFixed(2)}. 

     Your income after tax deduction is ₹${incomeAfterTax.toFixed(2)}.`;
    $('#resultModal').modal('show');
}
