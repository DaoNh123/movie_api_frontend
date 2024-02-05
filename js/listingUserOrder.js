if(!checkCookieExists("jwt")){
    window.location.href = "login.html";
}

const orderTableBodyTag = document.querySelector("tbody#order-table-body");

const listingOrderByUserUrl = `${backendUrl}/api/users/orders/listing-order`;
console.log(listingOrderByUserUrl);
const requestOption = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${getCookie("jwt")}`,
    }
};

fetchApiCommon(listingOrderByUserUrl, requestOption, "An error has occurred when fetching order data!", false)
.then(data => {
    for (const order of data) {
        console.log(order);
    }
    return data;
})
.then(orderList => {
    let i = 1;
    for (const order of orderList) {
        const seatList = order.orderDetailList.map(orderDetail => orderDetail.seatName);

        orderTableBodyTag.innerHTML += `
        <tr>
        <td>${i++}</td>
        <td>${order.slot.movie.movieName}</td>
        <td><img src=${order.slot.movie.posterUrl} style="width: 75px;" alt=""></td>
        <td>${order.slot.startTime.substring(0, 10)}</td>
        <td>${getTimeInString(order.slot.startTime)}</td>
        <td>${order.slot.theaterRoom}</td>
        <td>${seatList.join(", ")}</td>
        <td>${order.totalPrice} VND</td>
      </tr>
        `;
    }

    console.log(orderList.length);
    if(orderList.length === 0){
        orderTableBodyTag.innerHTML += `
        <tr>
            <td colspan="8">You have not ordered any tickets yet!</td>
        </tr>
        `;
    }
})
