//ham render du lieu
let productList = [];
let checkEdit = false;
function render_data() {
  let productListElement = document.querySelector(".product_list");
  productListElement.innerHTML = "";
  for (let i = 0; i < productList.length; i++) {
    productListElement.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${productList[i][0]}</td>
            <td>${productList[i][1]}</td>
            <td>${productList[i][2]}</td>
            <td>${productList[i][3]}</td>
            <td>${productList[i][4]}</td>
            <td>${productList[i][5]}</td>
            <td>${productList[i][6]}</td>
            <td>${productList[i][7]}</td>
            <td><button onclick="editProduct('${
              productList[i][0]
            }')">Edit</button><button onclick="deleteProduct('${
      productList[i][0]
    }')">Delete</button></td>
          </tr>`;
  }
}
// ham kiem tra du lieu nhap vao

function checkValidation() {
  let product_id = document.querySelector("#product_id").value;
  let product_name = document.querySelector("#product_name").value;
  let import_price = document.querySelector("#import_price").value;
  let export_price = document.querySelector("#export_price").value;
  let import_date = document.querySelector("#import_date").value;
  let size = document.querySelectorAll("input[type=checkbox]:checked");
  let description = document.querySelector("#description").value;
  if (
    import_price == "" ||
    product_id == "" ||
    product_name == "" ||
    import_date == "" ||
    size == [] ||
    description == "" ||
    export_price == ""
  ) {
    alert("Vui lòng điền đầy đủ thông tin form");
    return false;
  }
  let checkProductId = getProductByProductId(product_id);
  if (!checkEdit == true) {
    if (checkProductId > 0) {
      alert("mã sản phảm đã tồn tại, vui lòng nhập mã khác");
      return false;
    }
    if (product_id.length != 4 || product_id.startsWith("P") == false) {
      alert("Vui lòng nhập lại mã khác gồm 4 ký tự và bắt đầu bằng ký tự P");
      return false;
    }
  }

  let checkProductName = getProductByProductName(product_name);
  if (checkEdit == true) {
    if (product_name.length < 6 || product_name.length > 50) {
      alert("Vui lòng nhập tên sản phẩm từ 6-50 ký tự");
      return false;
    }
  } else {
    if (checkProductName > 0) {
      alert("Tên sản phẩm đã tồn tại vui lòng nhập tên sản phẩm khác");
      return false;
    }
    if (product_name.length < 6 || product_name.length > 50) {
      alert("Vui lòng nhập tên sản phẩm từ 6-50 ký tự");
      return false;
    }
  }

  if (isNaN(Number(import_price)) || Number(import_price) <= 0) {
    alert("Vui lòng nhập Import Price là số và lớn hơn 0");
    return false;
  }

  if (Number(export_price) <= Number(import_price)) {
    alert("Vui lòng nhập Export Price lớn hơn Improt Price");
    return false;
  }
  if (checkDate()) {
    alert("Vui lòng nhập thời gian trước hoặc bằng thời gian hiện tại");
    return false;
  }
  return true;
}
// ham doi thoi gian
function changeDate(import_date) {
  let dateParts = import_date.split("-");
  let date = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
  return date;
}
function reversChangeDate(import_date) {
  let dateParts = import_date.split("/");
  let date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  return date;
}

// ham submit
let submitBtn = document.querySelector(".btn");
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (checkValidation()) {
    let product_id = document.querySelector("#product_id").value;
    let product_name = document.querySelector("#product_name").value;
    let import_price = document.querySelector("#import_price").value;
    let export_price = document.querySelector("#export_price").value;
    let import_date = document.querySelector("#import_date").value;
    let sizeList = document.querySelectorAll("input[name=size]:checked");
    let size = [];
    sizeList.forEach((element) => {
      size.push(element.value);
    });
    let type = document.querySelector("input[name=type]:checked").value;
    let description = document.querySelector("#description").value;
    let date = changeDate(import_date);
    if (checkEdit == true) {
      let index = getProductByProductId(product_id);
      productList[index][1] = product_name;
      productList[index][2] = import_price;
      productList[index][3] = export_price;
      productList[index][4] = date;
      productList[index][5] = size.join(",");
      productList[index][6] = type;
      productList[index][7] = description;
    } else {
      let product = [];
      product.push(
        product_id,
        product_name,
        import_price,
        export_price,
        date,
        size.join(","),
        type,
        description
      );
      productList.push(product);
    }
    clearInput();
    render_data();
    document.querySelector("#product_id").readOnly = false;
    checkEdit = false;
  }
});

// ham lay ra product
function getProductByProductId(productId) {
  for (let i = 0; i < productList.length; i++) {
    if (productList[i][0] === productId) {
      return i;
    }
  }
  return -1;
}
function getProductByProductName(productName) {
  for (let i = 0; i < productList.length; i++) {
    if (productList[i][1] === productName) {
      return i;
    }
  }
  return -1;
}

// ham kiem tra thoi gian

function checkDate() {
  let import_date = document.querySelector("#import_date").value;
  let now = new Date();
  let time = new Date(import_date);
  if (time.getTime() > now.getTime()) {
    return true;
  }
  return false;
}
// hàm edit product
function editProduct(productId) {
  debugger;
  console.log(productId);
  let index = getProductByProductId(productId);
  document.querySelector("#product_id").value = productList[index][0];
  document.querySelector("#product_name").value = productList[index][1];
  document.querySelector("#import_price").value = productList[index][2];
  document.querySelector("#export_price").value = productList[index][3];
  document.querySelector("#description").value = productList[index][7];
  let date = reversChangeDate(productList[index][4]);
  document.querySelector("#import_date").value = date;
  let sizeList = productList[index][5].split(",");
  for (let i = 0; i < sizeList.length; i++) {
    if (sizeList[i] == "X") {
      document.querySelector("#X_size").checked = true;
    } else if (sizeList[i] == "XL") {
      document.querySelector("#XL_size").checked = true;
    } else if (sizeList[i] == "L") {
      document.querySelector("#L_size").checked = true;
    } else {
      continue;
    }
  }
  if (productList[index][6] === "Male") {
    document.querySelector("#male").checked = true;
  } else {
    document.querySelector("#female").checked = true;
  }
  document.querySelector("#product_id").readOnly = true;
  checkEdit = true;
}
// ham dalete product
function deleteProduct(productId) {
  let index = getProductByProductId(productId);
  productList.splice(index, 1);
  render_data();
}
// ham tim kiem product
function searchProduct(productName) {
  console.log(productName);
  let index = getProductByProductName(productName);
  let productListElement = document.querySelector(".product_list");
  productListElement.innerHTML = "";
  if (index >= 0) {
    productListElement.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>${productList[index][0]}</td>
            <td>${productList[index][1]}</td>
            <td>${productList[index][2]}</td>
            <td>${productList[index][3]}</td>
            <td>${productList[index][4]}</td>
            <td>${productList[index][5]}</td>
            <td>${productList[index][6]}</td>
            <td>${productList[index][7]}</td>
            <td><button onclick="editProduct('${
              productList[index][0]
            }')">Edit</button><button onclick="deleteProduct('${
      productList[index][0]
    }')">Delete</button></td>
          </tr>`;
  } else {
    productListElement.innerHTML = "Không tìm thấy sản phẩm phù hợp";
  }
}
let searchBtn = document.querySelector(".search_btn");
searchBtn.addEventListener("click", function () {
  let productName = document.querySelector("#search_product").value;
  searchProduct(productName);
  document.querySelector("#search_product").value = "";
});
// ham clear input
function clearInput() {
  document.querySelector("#product_id").value = "";
  document.querySelector("#product_name").value = "";
  document.querySelector("#import_price").value = "";
  document.querySelector("#export_price").value = "";
  document.querySelector("#import_date").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#male").checked = true;
  let sizeList = document.querySelectorAll("input[type=checkbox]");
  sizeList.forEach((element) => {
    element.checked = false;
  });
}
