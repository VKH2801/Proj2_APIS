const getPriceOfSize = (option, chooseSize) => {
    let object = option.find((e) => e.size === chooseSize);
    return object.price;
};

const handleSortBy = (cart) => {
    cart.sort((item1, item2) => {
        let nameA = item1.name.toUpperCase();
        let nameB = item2.name.toUpperCase();
        return nameA === nameB ? 0 : nameA > nameB ? 1 : -1;
    });
};

const handleAmount = (price, quantity) => {
    return price * quantity;
};

const hanldeTotalAmount = (arr) => {
    let totalAmount = 0;
    arr.forEach((e) => {
        totalAmount = totalAmount + e.amount;
    });
    return totalAmount;
};

module.exports = { getPriceOfSize, handleSortBy, handleAmount, hanldeTotalAmount };
