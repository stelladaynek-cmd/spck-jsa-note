const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    console.log(data); // xem cấu trúc
    render(data);
};

const render = (products) => {
    const container = document.getElementById("list");

    container.innerHTML = products
        .map(
            (p) => `
    <div>
      <img src="${p.image}" width="100"/>
      <h3>${p.title}</h3>
      <p>${p.price}$</p>
      <button onclick="addToCart(${p.id})">Mua</button>
    </div>
  `,
        )
        .join("");
};

getProducts();
